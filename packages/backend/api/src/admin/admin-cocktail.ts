import express from 'express';
import type { UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

import { cocktailSchema } from '../validaton-schemas';

const adminCocktailRouter = express.Router();

// Route get pour récupérer les cocktails présents en BDD
adminCocktailRouter.get('/', async (req, res) => {
  try {
    const cocktails = await db.selectFrom('cocktail').selectAll().execute();
    const totalCount = cocktails.length;
    res.header('Content-Range', String(totalCount));
    res.json(cocktails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un cocktail spécifique par son ID
adminCocktailRouter.get('/:id', async (req, res) => {
  try {
    const cocktailId = Number.parseInt(req.params.id);
    const cocktail = await db
      .selectFrom('cocktail')
      .selectAll()
      .where('id', '=', cocktailId)
      .executeTakeFirst();

    if (cocktail) {
      res.json(cocktail);
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un cocktail spécifique par son ID
adminCocktailRouter.put('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = cocktailSchema.parse(updateData) as UpdateObject<
      Database,
      'cocktail',
      'cocktail'
    >;

    const updatedCocktail = await db
      .updateTable('cocktail')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedCocktail) {
      res.json(updatedCocktail);
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un cocktail spécifique par son ID
adminCocktailRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    // On doit supprimer les FK d'abord
    await db
      .deleteFrom('cocktail_topping')
      .where('cocktail_id', '=', id)
      .execute();
    await db.deleteFrom('favorite').where('cocktail_id', '=', id).execute();
    await db.deleteFrom('rating').where('cocktail_id', '=', id).execute();
    await db.deleteFrom('recipe').where('cocktail_id', '=', id).execute();
    await db.deleteFrom('comment').where('cocktail_id', '=', id).execute();
    const deletedCocktail = await db
      .deleteFrom('cocktail')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedCocktail) {
      res.status(200).send('Cocktail deleted successfully');
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { adminCocktailRouter };
