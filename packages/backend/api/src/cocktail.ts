import express from 'express';

import { db } from '@app/backend-shared';

const cocktailRouter = express.Router();

// Route get pour récupérer les cocktails présents en BDD
cocktailRouter.get('/', async (req, res) => {
  try {
    const cocktails = await db.selectFrom('cocktail').selectAll().execute();
    res.json({ cocktails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les cocktails par id présents en BDD
cocktailRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const cocktail = await db
      .selectFrom('cocktail')
      .selectAll()
      .where('id', '=', Number.parseInt(id))
      .executeTakeFirst();

    if (!cocktail) {
      return res.status(404).send('Cocktail not found');
    }

    // Selectionner tous les ingrédients et les quantités respectives d'un seul cocktail en utilisant l'id du cocktail
    const ingredients = await db
      .selectFrom('cocktail')
      .innerJoin('recipe', 'recipe.cocktail_id', 'cocktail.id')
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
      .select([
        'ingredient.id as ingredient_id',
        'ingredient.name as ingredient_name',
        'action_ingredient.quantity as quantity',
        'action.verb as verb',
        'action.priority as priority',
      ])
      .where('cocktail.id', '=', Number.parseInt(id))
      .execute();

    const tools = await db
      .selectFrom('cocktail')
      .innerJoin('recipe', 'recipe.cocktail_id', 'cocktail.id')
      .innerJoin('action', 'recipe.action_id', 'action.id')
      .innerJoin('tool', 'action.tool_id', 'tool.id')
      .select([
        'tool.id as tool_id',
        'tool.name as tool_name',
        'tool.image as tool_image',
      ])
      .where('cocktail.id', '=', Number.parseInt(id))
      .execute();

    const toppings = await db
      .selectFrom('cocktail')
      .innerJoin(
        'cocktail_topping',
        'cocktail_topping.cocktail_id',
        'cocktail.id',
      )
      .innerJoin('topping', 'topping.id', 'cocktail.id')
      .select([
        'cocktail_topping.quantity as topping_quantity',
        'topping.id as topping_id',
        'topping.name as topping_name',
      ])
      .where('cocktail.id', '=', Number.parseInt(id))
      .execute();

    res.json({ cocktail, ingredients, toppings, tools });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Mettre à jour le champs anecdote grâce au formulaire
cocktailRouter.post('/:id', async (req, res) => {
  const id = req.params.id;
  const { anecdote } = req.body;

  try {
    await db
      .updateTable('cocktail')
      .set({
        anecdote: anecdote,
      })
      .where('id', '=', Number.parseInt(id))
      .execute();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { cocktailRouter };
