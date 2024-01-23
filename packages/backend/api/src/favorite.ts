import express from 'express';
import type { Request, Response } from 'express';

import { db } from '@app/backend-shared';

// import loginIdUser from './middlewares/login-id-user';

interface RequestWithUser extends Request {
  userId?: number;
}

const favoriteRouter = express.Router();

/* favoriteRouter.get(
  '/',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => { */
favoriteRouter.get('/', async (req: RequestWithUser, res: Response) => {
  /*  const userId = req.userId; */
  const userId = 1;

  try {
    const cocktail = await db
      .selectFrom('favorite')
      .innerJoin('cocktail', 'favorite.cocktail_id', 'cocktail.id')
      .select((eb) => [
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

    res.json(cocktail);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/* favoriteRouter.post(
  '/favoriteAdd/:cocktailId',
  loginIdUser,
  async (req: RequestWithUser, res: Response) => { */
favoriteRouter.post(
  '/add/:cocktailId',
  async (req: RequestWithUser, res: Response) => {
    /*  const userId = req.userId; */
    const userId = 1;
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
