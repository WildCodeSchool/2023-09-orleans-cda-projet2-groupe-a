import express from 'express';
import type { UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database, GlassTable } from '@app/types';

import { glassSchema, glassSchemaPut } from '../validaton-schemas';

const adminGlassRouter = express.Router();

// Route get pour récupérer les verres présents en BDD
adminGlassRouter.get('/', async (req, res) => {
  try {
    const glasses = await db.selectFrom('glass').selectAll().execute();
    const totalCount = glasses.length;
    res.header('Content-Range', String(totalCount));
    res.json(glasses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un verre spécifique par son ID
adminGlassRouter.get('/:id', async (req, res) => {
  try {
    const glassId = Number.parseInt(req.params.id);
    const glass = await db
      .selectFrom('glass')
      .selectAll()
      .where('id', '=', glassId)
      .executeTakeFirst();

    if (glass) {
      res.json(glass);
    } else {
      res.status(404).send('Glass not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un verre spécifique par son ID
adminGlassRouter.put('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = glassSchemaPut.parse(updateData) as UpdateObject<
      Database,
      'glass',
      'glass'
    >;

    const updatedGlass = await db
      .updateTable('glass')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedGlass) {
      res.json(updatedGlass);
    } else {
      res.status(404).send('Glass not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route POST pour créer un nouveau verre
adminGlassRouter.post('/', async (req, res) => {
  try {
    const parsedGlassData = glassSchema.parse(req.body);
    const createdGlass = await db
      .insertInto('glass')
      .values(parsedGlassData)
      .executeTakeFirst();
    res.status(201).json(createdGlass);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un verre spécifique par son ID
adminGlassRouter.delete('/:id', async (req, res) => {
  try {
    const glassId = Number.parseInt(req.params.id);
    const cocktailIds = await db
      .selectFrom('cocktail')
      .select('id')
      .where('glass_id', '=', glassId)
      .execute();
    for (const { id: cocktailId } of cocktailIds) {
      await db
        .deleteFrom('cocktail_topping')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('favorite')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('rating')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('recipe')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('comment')
        .where('cocktail_id', '=', cocktailId)
        .execute();
    }
    await db.deleteFrom('cocktail').where('glass_id', '=', glassId).execute();
    const deletedGlass = await db
      .deleteFrom('glass')
      .where('id', '=', glassId)
      .executeTakeFirst();

    if (deletedGlass) {
      res.status(200).send('Glass deleted successfully');
    } else {
      res.status(404).send('Glass not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { adminGlassRouter };
