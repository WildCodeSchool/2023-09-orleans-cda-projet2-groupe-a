import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const ingredient = express.Router();

ingredient.get('/random', async (req, res) => {
  const ingredient = await db
    .selectFrom('ingredient')
    .select(['ingredient.id', 'ingredient.name', 'ingredient.flavour'])
    .orderBy(sql`RAND()`)
    .limit(1)
    .executeTakeFirst();

  return res.json(ingredient);
});

ingredient.get('/:ingredientId', async (req, res) => {
  const ingredientId = req.params.ingredientId;

  // It get the 6 most popular ingredients base on one ingredient
  const ingredientsByIngredient = await db
    .selectFrom('ingredient')
    .select(['ingredient.id', 'ingredient.name', 'ingredient.flavour'])
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
    .where('ingredient.id', '!=', Number.parseInt(ingredientId))
    .groupBy('ingredient.id')
    .orderBy(sql`COUNT(ingredient.id)`, 'desc')
    .limit(6)
    .execute();

  // It complete my function with random ingredients, in cas there is not enough
  const ingredient = await db
    .selectFrom('ingredient')
    .select(['ingredient.id', 'ingredient.name', 'ingredient.flavour'])
    .where('ingredient.id', '!=', Number.parseInt(ingredientId))
    .orderBy(sql`rand()`)
    .limit(6 - ingredientsByIngredient.length)
    .execute();

  return res.json([...ingredientsByIngredient, ...ingredient]);
});

ingredient.get('/search/:ingredientname', async (req, res) => {
  const ingredientname = `%${req.params.ingredientname}%`;

  const ingredient = await db
    .selectFrom('ingredient')
    .select(['ingredient.id', 'ingredient.name', 'ingredient.flavour'])
    .where('ingredient.name', 'like', ingredientname)
    .orderBy('ingredient.name', 'asc')
    .execute();

  return res.json(ingredient);
});

export { ingredient };
