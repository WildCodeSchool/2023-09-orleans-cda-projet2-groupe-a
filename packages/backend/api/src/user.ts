import express from 'express';
import type { Request, Response } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import validateUpdateUser from './middlewares/validate-update-user';

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

async function getUserById(id: number) {
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
        user.image,
        user.color,
        user.email,
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

async function getAllUsers() {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT 
        user.id, 
        user.pseudo, 
        user.image, 
        user.color,
        COUNT(cocktail.id) AS cocktail_count,
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
          END
        ) AS average_rating
        FROM user 
        LEFT JOIN cocktail ON user.id = cocktail.author
        LEFT JOIN rating ON cocktail.id = rating.cocktail_id
        GROUP BY user.id;
    `.execute(trx);

    return result.rows;
  });
}

user.get('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);

  try {
    const result = await getUserById(id);
    res.json(result[0]);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

user.get('/', async (req, res) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

interface Updates {
  pseudo?: string;
  image?: string;
  email?: string;
  password?: string;
  color?: string;
}

user.put('/:id', validateUpdateUser, async (req: Request, res: Response) => {
  const {
    pseudo,
    image,
    color,
    actualPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;
  const id = Number.parseInt(req.params.id);

  try {
    const updates: Updates = {};
    if (pseudo) updates.pseudo = pseudo;
    if (image) updates.image = image;
    if (color) updates.color = color;

    if (actualPassword) {
      const user = await db
        .selectFrom('user')
        .select(['user.password'])
        .where('user.id', '=', id)
        .executeTakeFirst();

      if (user === undefined) {
        res.status(400).json('user not found');
        return;
      }

      const isCorrectPassword = await Bun.password.verify(
        actualPassword,
        user.password,
        'bcrypt',
      );

      if (!isCorrectPassword) {
        res.status(400).json('wrong password');
        return;
      }

      if (newPassword !== confirmNewPassword) {
        res.status(400).json('passwords do not match');
        return;
      }
      const hashedPassword = await Bun.password.hash(newPassword, {
        algorithm: 'bcrypt',
        cost: 15,
      });

      updates.password = hashedPassword;
    }

    await db
      .updateTable('user')
      .set(updates)
      .where('id', '=', id)
      .executeTakeFirst();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { user };
