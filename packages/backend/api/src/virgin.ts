import express from 'express';

import { db } from '@app/backend-shared';

const virginRouter = express.Router();

// Route get to retrieve virgin cocktails where total_degree equals 0
virginRouter.get('/', async (req, res) => {
  try {
    const virginCocktails = await db
      .selectFrom('cocktail')
      .selectAll()
      .innerJoin('recipe', 'cocktail.id', 'recipe.cocktail_id')
      .innerJoin('action', 'recipe.action_id', 'action.id')
      .innerJoin(
        'action_ingredient',
        'action.id',
        'action_ingredient.action_id',
      )
      .innerJoin(
        'ingredient',
        'action_ingredient.ingredient_id',
        'ingredient.id',
      )
      .where('cocktail.total_degree', '=', 0)
      .where('ingredient.family', '!=', 'alcohol')
      .execute();

    res.json({ virginCocktails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  console.log(res.json());
});

export { virginRouter };
