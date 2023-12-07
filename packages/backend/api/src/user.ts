import express from 'express';

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
      'comment.content',
      'comment.cocktail_id as comment_cocktail_id',
      'rating.cocktail_id as rating_cocktail_id',
      'cocktail.name',
      'rating.score',
    ])
    .where('user.id', '=', Number.parseInt(id))
    .execute();

  return res.json(userById);
});

export { user };
