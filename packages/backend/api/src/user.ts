import express from 'express';
import { type Kysely, sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

const user = express.Router();

// This SQL query retrieves the following:
// - The user's pseudonym
// - All cocktails posted by this user, including:
//    - The average rating received by their cocktails
//    - The name of each cocktail
//    - The main ingredient of each cocktail (determined by either the highest alcohol content or the highest quantity)
// - All comments posted by the user, including:
//    - The content of each comment
//    - The rating given in each comment
//    - The name of the cocktail associated with each comment

async function getUserById(db: Kysely<Database>, id: number) {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      WITH ranked_ingredients AS (
        SELECT 
          cocktail.id AS cocktail_id, 
          ingredient.id, 
          ingredient.name AS ingredient_name, 
          ingredient.family, 
          action_ingredient.quantity, 
          ROW_NUMBER() OVER (
            PARTITION BY cocktail.id 
            ORDER BY CASE WHEN ingredient.family = 'alcool' THEN 0 ELSE 1 END, 
            action_ingredient.quantity DESC
          ) AS rnk 
        FROM cocktail 
        INNER JOIN recipe ON cocktail.id = recipe.cocktail_id 
        INNER JOIN action ON recipe.action_id = action.id 
        INNER JOIN action_ingredient ON action.id = action_ingredient.action_id 
        INNER JOIN ingredient ON action_ingredient.ingredient_id = ingredient.id
      ), 
      cocktails_with_average_rating AS (
        SELECT 
          cocktail.id AS cocktail_id, 
          cocktail.name AS cocktail_name, 
          user.id AS author_id, 
          AVG(
            CASE rating.score 
              WHEN '0.5' THEN 0.5 
              WHEN '1' THEN 1 
              WHEN '1.5' THEN 1.5 
              WHEN '2' THEN 2 
              WHEN '2.5' THEN 2.5 
              WHEN '3' THEN 3 
              WHEN '3.5' THEN 3.5 
              WHEN '4' THEN 4 
              WHEN '4.5' THEN 4.5 
              WHEN '5' THEN 5 
              WHEN '5.5' THEN 5.5 
              WHEN '6' THEN 6 
              WHEN '6.5' THEN 6.5 
              WHEN '7' THEN 7 
              WHEN '7.5' THEN 7.5 
              WHEN '8' THEN 8 
              WHEN '8.5' THEN 8.5 
              WHEN '9' THEN 9 
              WHEN '9.5' THEN 9.5 
              WHEN '10' THEN 10 
              ELSE 0 
            END
          ) AS avg_rating 
        FROM user 
        INNER JOIN cocktail ON user.id = cocktail.author 
        LEFT JOIN rating ON cocktail.id = rating.cocktail_id 
        WHERE user.id = ${id} 
        GROUP BY cocktail.id, cocktail.name, user.id
      ) 
      SELECT 
        user.pseudo, 
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'cocktail_id', ci.cocktail_id, 
                'cocktail_name', ci.cocktail_name, 
                'avg_rating', ci.avg_rating, 
                'ingredient_name', ri.ingredient_name, 
                'family', ri.family
              )
            ) 
          FROM cocktails_with_average_rating ci 
          JOIN ranked_ingredients ri ON ci.cocktail_id = ri.cocktail_id AND ri.rnk = 1 
          WHERE user.id = ci.author_id
        ) AS cocktails, 
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'comment_id', comment.id, 
                'content', comment.content, 
                'cocktail_name', cocktail.name, 
                'score', rating.score, 
                'cocktail_id', cocktail.id
              )
            ) 
          FROM comment 
          LEFT JOIN cocktail ON comment.cocktail_id = cocktail.id 
          LEFT JOIN rating ON user.id = rating.user_id AND cocktail.id = rating.cocktail_id 
          WHERE user.id = comment.user_id
        ) AS comments 
      FROM user 
      WHERE user.id = ${id};
    `.execute(trx);

    return result.rows;
  });
}

user.get('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);

  try {
    const result = await getUserById(db, id);
    res.json(result[0]);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { user };
