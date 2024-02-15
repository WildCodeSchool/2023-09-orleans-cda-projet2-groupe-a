import express from 'express';
import type { Request } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import checkAuthState from './middlewares/check-auth-state';

interface RequestWithUser extends Request {
  userId?: number;
  isloggedIn?: boolean;
}

const virginRouter = express.Router();

// Route get to retrieve virgin cocktails where total_degree equals 0
virginRouter.get('/', checkAuthState, async (req: RequestWithUser, res) => {
  const userId = req.userId;
  const isloggedIn = req.isloggedIn;
  try {
    const virginCocktails = await db
      .selectFrom('cocktail')
      .selectAll()
      .$if(isloggedIn !== undefined && isloggedIn, (qb) =>
        qb.select(
          sql`EXISTS(SELECT 1 FROM favorite WHERE favorite.cocktail_id = cocktail.id AND favorite.user_id = ${userId})`.as(
            'is_favorite',
          ),
        ),
      )
      .where('total_degree', '=', 0)
      .execute();

    res.json({ virginCocktails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { virginRouter };
