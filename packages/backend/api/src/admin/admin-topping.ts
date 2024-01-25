import express from 'express';
import type { UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

import { toppingSchema, toppingSchemaPut } from '../validaton-schemas';

const adminToppingRouter = express.Router();

// Route get pour récupérer les toppings présents en BDD
adminToppingRouter.get('/', async (req, res) => {
  try {
    const toppings = await db.selectFrom('topping').selectAll().execute();
    const totalCount = toppings.length;
    res.header('Content-Range', String(totalCount));
    res.json(toppings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un topping spécifique par son ID
adminToppingRouter.get('/:id', async (req, res) => {
  try {
    const toppingId = Number.parseInt(req.params.id);
    const topping = await db
      .selectFrom('topping')
      .selectAll()
      .where('id', '=', toppingId)
      .executeTakeFirst();

    if (topping) {
      res.json(topping);
    } else {
      res.status(404).send('Topping not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un topping spécifique par son ID
adminToppingRouter.put('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = toppingSchemaPut.parse(updateData) as UpdateObject<
      Database,
      'topping',
      'topping'
    >;

    const updatedTopping = await db
      .updateTable('topping')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedTopping) {
      res.json(updatedTopping);
    } else {
      res.status(404).send('Topping not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route POST pour créer un nouveau topping
adminToppingRouter.post('/', async (req, res) => {
  try {
    const parsedToppingData = toppingSchema.parse(req.body);
    const createdTopping = await db
      .insertInto('topping')
      .values(parsedToppingData)
      .executeTakeFirst();
    res.status(201).json(createdTopping);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un topping spécifique par son ID
adminToppingRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    await db
      .deleteFrom('cocktail_topping')
      .where('topping_id', '=', id)
      .execute();
    const deletedTopping = await db
      .deleteFrom('topping')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedTopping) {
      res.status(200).send('Topping deleted successfully');
    } else {
      res.status(404).send('Topping not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { adminToppingRouter };
