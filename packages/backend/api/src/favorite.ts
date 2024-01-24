import express from 'express';
import type { Request, Response } from 'express';

import { db } from '@app/backend-shared';

import loginIdUser from './middlewares/login-id-user';

interface RequestWithUser extends Request {
  userId?: number;
}

const favoriteRouter = express.Router();

favoriteRouter.get(
  '/',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;

    if (userId === undefined) {
      return res.json({ ok: false, message: 'not connected' });
    }

    try {
      const cocktail = await db
        .selectFrom('favorite')
        .innerJoin('cocktail', 'favorite.cocktail_id', 'cocktail.id')
        .leftJoin('recipe', 'recipe.cocktail_id', 'cocktail.id')
        .leftJoin('action', 'recipe.action_id', 'action.id')
        .leftJoin(
          'action_ingredient',
          'action.id',
          'action_ingredient.action_id',
        )
        .leftJoin(
          'ingredient',
          'action_ingredient.ingredient_id',
          'ingredient.id',
        )
        .select((eb) => [
          'cocktail.id',
          'cocktail.name',
          'cocktail.image',
          'cocktail.ratings_average',
          'cocktail.total_degree',
        ])
        .groupBy('cocktail.id')
        .where('favorite.user_id', '=', Number(userId))
        .orderBy('cocktail.name')
        .execute();

      if (!cocktail) {
        return res.status(404).send('Cocktail not found');
      }

      res.json(cocktail);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

favoriteRouter.post(
  '/favoriteAdd/:cocktailId',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;
    const { cocktailId } = req.params;

    if (userId === undefined) {
      return res.json({ result: 'not connected' });
    }

    try {
      await db.transaction().execute(async (trx) => {
        const isInFavorite = await trx
          .selectFrom('favorite')
          .selectAll()
          .where('cocktail_id', '=', Number.parseInt(cocktailId))
          .where('user_id', '=', Number(userId))
          .executeTakeFirst();

        await (isInFavorite === undefined
          ? trx
              .insertInto('favorite')
              .values({
                cocktail_id: Number.parseInt(cocktailId),
                user_id: Number(userId),
              })
              .executeTakeFirst()
          : trx
              .deleteFrom('favorite')
              .where('cocktail_id', '=', Number.parseInt(cocktailId))
              .where('user_id', '=', Number(userId))
              .executeTakeFirst());
      });
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

export { favoriteRouter };
