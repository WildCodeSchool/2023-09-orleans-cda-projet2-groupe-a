import express from 'express';
import type { Request, Response } from 'express';

import { db } from '@app/backend-shared';

import blockNotLogin from './middlewares/block-not-login';
import checkAuthState from './middlewares/check-auth-state';

interface RequestWithUser extends Request {
  userId?: number;
  isloggedIn?: boolean;
}

const favoriteRouter = express.Router();

favoriteRouter.get(
  '/',
  checkAuthState,
  blockNotLogin,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;

    try {
      const cocktail = await db
        .selectFrom('favorite')
        .innerJoin('cocktail', 'favorite.cocktail_id', 'cocktail.id')
        .select([
          'cocktail.id',
          'cocktail.name',
          'cocktail.image',
          'cocktail.ratings_average',
          'cocktail.total_degree',
        ])
        .where('favorite.user_id', '=', Number(userId))
        .orderBy('cocktail.name')
        .execute();

      if (!cocktail) {
        return res.status(404).send('Cocktail not found');
      }

      res.json({ cocktails: cocktail });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

favoriteRouter.post(
  '/:cocktailId/toggle',
  checkAuthState,
  blockNotLogin,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;
    const { cocktailId } = req.params;

    try {
      const toggleFavorite = await db.transaction().execute(async (trx) => {
        const isInFavorite = await trx
          .selectFrom('favorite')
          .selectAll()
          .where('cocktail_id', '=', Number.parseInt(cocktailId))
          .where('user_id', '=', Number(userId))
          .executeTakeFirst();

        if (isInFavorite === undefined) {
          await trx
            .insertInto('favorite')
            .values({
              cocktail_id: Number.parseInt(cocktailId),
              user_id: Number(userId),
            })
            .executeTakeFirstOrThrow();
          return { ok: true, message: 'add' };
        } else {
          await trx
            .deleteFrom('favorite')
            .where('cocktail_id', '=', Number.parseInt(cocktailId))
            .where('user_id', '=', Number(userId))
            .executeTakeFirstOrThrow();
          return { ok: true, message: 'delete' };
        }
      });
      return res.json(toggleFavorite);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

export { favoriteRouter };
