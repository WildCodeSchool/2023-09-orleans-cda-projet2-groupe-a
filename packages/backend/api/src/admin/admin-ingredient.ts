import express from 'express';
import type { InsertObject, UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

import { ingredientSchema, ingredientSchemaPut } from '../validaton-schemas';

const adminIngredientRouter = express.Router();

// Route get pour récupérer les ingrédients présents en BDD
adminIngredientRouter.get('/', async (req, res) => {
  try {
    const ingredients = await db.selectFrom('ingredient').selectAll().execute();
    const totalCount = ingredients.length;
    res.header('Content-Range', String(totalCount));
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un ingrédient spécifique par son ID
adminIngredientRouter.get('/ingredient/:id', async (req, res) => {
  try {
    const ingredientId = Number.parseInt(req.params.id);
    const ingredient = await db
      .selectFrom('ingredient')
      .selectAll()
      .where('id', '=', ingredientId)
      .executeTakeFirst();

    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).send('Ingredient not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un ingrédient spécifique par son ID
adminIngredientRouter.put('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = ingredientSchemaPut.parse(
      updateData,
    ) as UpdateObject<Database, 'ingredient', 'ingredient'>;

    const updatedIngredient = await db
      .updateTable('ingredient')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedIngredient) {
      res.json(updatedIngredient);
    } else {
      res.status(404).send('Ingredient not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route POST pour créer un nouveau ingrédient
adminIngredientRouter.post('/', async (req, res) => {
  try {
    const parsedIngredientData = ingredientSchema.parse(req.body);
    const createdIngredient = await db
      .insertInto('ingredient')
      .values(parsedIngredientData as InsertObject<Database, 'ingredient'>)
      .executeTakeFirst();
    res.status(201).json(createdIngredient);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un ingredient spécifique par son ID
adminIngredientRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    await db
      .deleteFrom('action_ingredient')
      .where('ingredient_id', '=', id)
      .execute();
    const deletedIngredient = await db
      .deleteFrom('ingredient')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedIngredient) {
      res.status(200).send('Ingredient deleted successfully');
    } else {
      res.status(404).send('Ingredient not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { adminIngredientRouter };
