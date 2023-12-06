import express from 'express';

import { db } from '@app/backend-shared';

const ingredient = express.Router();

ingredient.get('/:ingredientId', async (req, res) => {
  const ingredientId = req.params.ingredientId;

  // It get the 6 most popular ingredients base on one ingredient
  const ingredientsByIngredient = await db
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
    .limit(6)
    .offset(1)
    .execute();

  // It get all the ingredients
  const ingredient = async () =>
    await db.selectFrom('ingredient').selectAll().execute();

  // It check if i have enough ingredients to return 6. If not, it add random ingredients
  for (let index = ingredientsByIngredient.length; index < 6; index++) {
    const ingredientArray = await ingredient();
    const randomNumber = Math.floor(Math.random() * ingredientArray.length);
    const randomIngredient = ingredientArray[randomNumber];

    if (
      ingredientsByIngredient.some(
        (ingredient) =>
          ingredient.name === randomIngredient.name &&
          Number.parseInt(ingredientId) === randomIngredient.id,
      )
    ) {
      index--;
    } else {
      const newIngredient = { name: randomIngredient.name, count: 0 };
      ingredientsByIngredient.push(newIngredient);
    }
  }

  return res.json(ingredientsByIngredient);
});

export { ingredient };
