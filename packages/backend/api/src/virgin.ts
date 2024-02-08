import express from 'express';

import { db } from '@app/backend-shared';

const virginRouter = express.Router();

// Route get to retrieve virgin cocktails where total_degree equals 0
virginRouter.get('/', async (req, res) => {
  try {
    const virginCocktails = await db
      .selectFrom('cocktail')
      .selectAll()
      .where('total_degree', '=', 0)
      .execute();

    res.json({ virginCocktails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { virginRouter };
