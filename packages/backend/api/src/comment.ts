import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

import loginIdUser from './middlewares/login-id-user';

const commentRouter = express.Router();

// Route get pour récupérer les commentaires présents en BDD
commentRouter.get('/', async (req, res) => {
  try {
    const comments = await db.selectFrom('comment').selectAll().execute();
    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les commentaires d'un cocktail par id
commentRouter.get('/:id', async (req, res) => {
  const cocktailId = req.params.id;
  try {
    const comments = await db
      .selectFrom('cocktail')
      .selectAll()
      .select((eb) => [
        'id',
        jsonArrayFrom(
          eb
            .selectFrom('comment')
            .innerJoin('user', 'user.id', 'comment.user_id')
            .leftJoin('rating', (join) =>
              join
                .onRef('rating.user_id', '=', 'user.id')
                .onRef('rating.cocktail_id', '=', 'comment.cocktail_id'),
            )
            .select([
              'comment.id',
              'comment.content',
              'comment.created_at',
              'user.id as user_id',
              'user.pseudo as user_name',
              'user.image as user_image',
              'rating.score',
            ])
            .whereRef('comment.cocktail_id', '=', 'cocktail.id'),
        ).as('commentsByUserIdCocktailId'),
      ])
      .where('cocktail.id', '=', Number.parseInt(cocktailId))
      .executeTakeFirst();

    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
  }
}

// Ajouter un commentaire en base de donnée
commentRouter.post('/:id', loginIdUser, async (req, res) => {
  const { content } = req.body;
  const createdAt = new Date();
  const cocktailId = req.params.id;
  const userId = req.userId;

  if (!content) {
    return res.status(400).send('Content is required.');
  }
  if (!userId) {
    return res.status(401).send('You must be logged in to post a comment!');
  }

  try {
    await db
      .insertInto('comment')
      .values({
        user_id: userId,
        cocktail_id: Number.parseInt(cocktailId),
        content: content,
        created_at: createdAt,
      })
      .execute();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { commentRouter };
