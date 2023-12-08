import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const user = express.Router();

user.get('/:id', async (req, res) => {
  const id = req.params.id;

  const userById = await db
    .selectFrom('user')
    .innerJoin('comment', 'comment.user_id', 'user.id')
    .innerJoin('rating', 'rating.user_id', 'user.id')
    .innerJoin('cocktail', 'rating.cocktail_id', 'cocktail.id')
    .select([
      'user.pseudo',
      sql`GROUP_CONCAT(CONCAT("{comment:'", comment.content, "', cocktail:'", cocktail.name, "', score:", rating.score, "}")) AS comments`,
    ])
    .where('user.id', '=', Number.parseInt(id))
    .groupBy('user.id')
    .execute();

  return res.json(userById);
});

user.get('/:id/favorite', async (req, res) => {
  const id = req.params.id;

  const cocktailsByUser = await db
    .selectFrom('user')
    .innerJoin('cocktail', 'cocktail.author', 'user.id')
    .innerJoin('rating', 'rating.cocktail_id', 'cocktail.id')
    .select([
      'cocktail.name',
      'cocktail.id',
      sql`
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
              ELSE 0  
          END) AS avg
      `,
    ])
    .where('user.id', '=', Number.parseInt(id))
    .groupBy('cocktail.id')
    .execute();

  return res.json(cocktailsByUser);
});

export { user };
