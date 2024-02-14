import express from 'express';
import type { Request, Response } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import blockNotLogin from './middlewares/block-not-login';
import checkAuthState from './middlewares/check-auth-state';
import validateComment from './middlewares/validate-comment';

interface RequestWithUser extends Request {
  userId?: number;
}

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

async function getAllComments(id: number) {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT 
      JSON_ARRAYAGG(JSON_OBJECT('user_id', comment.user_id, 'pseudo', user.pseudo, 'cocktail_id', comment.cocktail_id, 'comment_id', comment.id, 'comment', comment.content, 'rating_id', rating.id, 'rating', rating.score)) as comments_ratings,
      AVG(rating.score) as average_rating
      FROM 
      comment
      JOIN 
      rating 
      ON 
      comment.id = rating.id 
      AND comment.cocktail_id = rating.cocktail_id
      JOIN
      user
      ON
      comment.user_id = user.id
      WHERE 
      comment.cocktail_id = ${id};
    `.execute(trx);

    return result.rows;
  });
}

// Route get pour récupérer les commentaires d'un cocktail par id
commentRouter.get('/:id', async (req, res) => {
  const cocktailId = req.params.id;
  try {
    const comments = await getAllComments(Number.parseInt(cocktailId));
    return res.json(comments[0]);
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
commentRouter.post(
  '/:id',
  checkAuthState,
  blockNotLogin,
  validateComment,
  async (req: RequestWithUser, res: Response) => {
    const { content, score } = req.body;
    const createdAt = new Date();
    const cocktailId = req.params.id;
    const userId = req.userId;

    if (userId === undefined) {
      return res.json({ ok: false, message: 'not connected' });
    }

    try {
      await db.transaction().execute(async (trx) => {
        await trx
          .insertInto('comment')
          .values({
            user_id: userId,
            cocktail_id: Number.parseInt(cocktailId),
            content: content,
            created_at: createdAt,
          })
          .executeTakeFirstOrThrow();

        await trx
          .insertInto('rating')
          .values({
            user_id: userId,
            cocktail_id: Number.parseInt(cocktailId),
            score: score,
            created_at: createdAt,
          })
          .executeTakeFirstOrThrow();
      });

      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

export { commentRouter };
