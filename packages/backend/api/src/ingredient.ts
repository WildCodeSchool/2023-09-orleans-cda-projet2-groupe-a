import express from 'express';

import { db } from '@app/backend-shared';

const ingredient = express.Router();

ingredient.get('/:ingredientId', async (req, res) => {
  const ingredientId = req.params.ingredientId;

  // It get all the cocktails that have the ingredient
  const cocktailByIngredient = await db
    .selectFrom('action')
    .innerJoin('action_ingredient', 'action.id', 'action_ingredient.action_id')
    .innerJoin('ingredient', 'ingredient.id', 'action_ingredient.ingredient_id')
    .innerJoin('recipe', 'recipe.action_id', 'action.id')
    .where('ingredient.id', '=', Number.parseInt(ingredientId))
    .select('recipe.cocktail_id')
    .execute();

  // It turn my array of objects into an array of numbers
  const arrayCocktails = cocktailByIngredient.map((row) => {
    return row.cocktail_id;
  });

  // It get all the ingredients of the cocktails that have the ingredient
  const ingredientByCocktail = await db
    .selectFrom('action')
    .innerJoin('recipe', 'recipe.action_id', 'action.id')
    .innerJoin('action_ingredient', 'action.id', 'action_ingredient.action_id')
    .innerJoin('ingredient', 'ingredient.id', 'action_ingredient.ingredient_id')
    .where('recipe.cocktail_id', 'in', arrayCocktails)
    .select('ingredient.name')
    .execute();

  // It get all the ingredients
  const ingredient = async () =>
    await db.selectFrom('ingredient').select('ingredient.name').execute();

  // It group the ingredients by name and count them
  const groupedIngredients: { [key: string]: number } = {};
  for (const ingredient of ingredientByCocktail) {
    const name = ingredient.name;
    groupedIngredients[name] = (groupedIngredients[name] || 0) + 1;
  }

  // It turn my object into an array of objects
  const resultArrayGrouped = Object.keys(groupedIngredients).map((name) => ({
    name,
    count: groupedIngredients[name],
  }));

  // It sort my array of objects by count
  const popularIngredients = resultArrayGrouped.sort(
    (a, b) => a.count - b.count,
  );

  // It check if i have enough ingredients to return 7 (6 new and the one i clicked). If not, i add random ingredients
  for (let index = popularIngredients.length; index < 7; index++) {
    const ingredientArray = await ingredient();
    const randomNumber = Math.floor(Math.random() * ingredientArray.length);
    const randomIngredient = ingredientArray[randomNumber];
    const newIngredient = { name: randomIngredient.name, count: 0 };

    if (
      popularIngredients.some(
        (ingredient) => ingredient.name === newIngredient.name,
      )
    ) {
      index--;
    } else {
      popularIngredients.push(newIngredient);
    }
  }

  const max = popularIngredients.length - 1;
  const min = popularIngredients.length - 7;

  // It return the 6 most popular ingredients
  const sixMostPopular = popularIngredients.slice(min, max).reverse();

  return res.json(sixMostPopular);
});

export { ingredient };
