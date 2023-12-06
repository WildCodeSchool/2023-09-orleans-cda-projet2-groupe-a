import express from 'express';

import { db } from '@app/backend-shared';

const ingredient = express.Router();

ingredient.get('/:ingredientId', async (req, res) => {
  const ingredientId = req.params.ingredientId;

  const cocktailByIngredient = await db
    .selectFrom('ingredient')
    .select(({ fn }) => [
      'ingredient.name',
      fn.count<number>('ingredient.id').as('count'),
    ])
    .innerJoin(
      'action_ingredient',
      'ingredient.id',
      'action_ingredient.ingredient_id',
    )
    .innerJoin('action', 'action_ingredient.action_id', 'action.id')
    .innerJoin('recipe', 'action.id', 'recipe.action_id')
    .where(
      'recipe.cocktail_id',
      'in',
      db
        .selectFrom('recipe')
        .select('cocktail_id')
        .innerJoin('action', 'recipe.action_id', 'action.id')
        .innerJoin(
          'action_ingredient',
          'action.id',
          'action_ingredient.action_id',
        )
        .where(
          'action_ingredient.ingredient_id',
          '=',
          Number.parseInt(ingredientId),
        ),
    )
    .groupBy('ingredient.name')
    .orderBy('count', 'desc')
    .limit(7)
    .execute();

  return res.json(cocktailByIngredient);
});

export { ingredient };
