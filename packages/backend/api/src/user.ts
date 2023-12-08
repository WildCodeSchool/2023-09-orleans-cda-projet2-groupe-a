import express from 'express';
import { type Kysely, sql } from 'kysely';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

const user = express.Router();

async function getUserById(db: Kysely<Database>, id: number) {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT 
        user.pseudo, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'content', comment.content,
            'cocktailName', cocktail.name,
            'score', rating.score,
            'cocktailId', cocktail.id
          )
        ) AS comments,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'cocktailName', cocktail.name,
            'cocktailId', cocktail.id,
            'averageScore', avg_scores.avg
          )
        ) AS cocktails
      FROM 
        user 
      LEFT JOIN 
        comment ON comment.user_id = user.id 
      LEFT JOIN 
        rating ON rating.user_id = user.id AND rating.cocktail_id = comment.cocktail_id
      LEFT JOIN 
        cocktail ON cocktail.id = comment.cocktail_id 
      LEFT JOIN 
        (
          SELECT 
            cocktail.id AS cocktail_id, 
            AVG(CASE score 
              WHEN '0' THEN 0 
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
              ELSE 0 END) AS avg
          FROM 
            cocktail 
          INNER JOIN 
            rating ON rating.cocktail_id = cocktail.id 
          GROUP BY 
            cocktail.id
        ) AS avg_scores ON avg_scores.cocktail_id = cocktail.id
      WHERE 
        user.id = ${id}
      GROUP BY 
        user.id;
    `.execute(trx);

    return result.rows;
  });
}

user.get('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);

  try {
    const result = await getUserById(db, id);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { user };
