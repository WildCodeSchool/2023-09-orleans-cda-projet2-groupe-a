import express from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';
import { log } from 'node:console';

import { db } from '@app/backend-shared';

import multerConfig from './middlewares/multer-config';

const cocktailRouter = express.Router();

// Route post pour uploader un fichier
cocktailRouter.post('/:id/upload', multerConfig, async (req, res) => {
  const cocktailId = Number.parseInt(req.params.id);
  const anecdote = req.body.anecdote === '' ? null : req.body.anecdote;
  const cocktailPicName = req.file ? req.file.filename : null;
  const fieldsToUpdate = [];
  if (anecdote !== null) {
    fieldsToUpdate.push({ name: 'anecdote', value: anecdote });
  }
  if (cocktailPicName !== null) {
    fieldsToUpdate.push({ name: 'image', value: cocktailPicName });
  }
  const fieldsToUpdateString = fieldsToUpdate
    .map((field) => {
      return `${field.name} = '${field.value}'`;
    })
    .join(', ');
  const query =
    'UPDATE cocktail SET ' +
    fieldsToUpdateString +
    ' WHERE cocktail.id = ' +
    cocktailId +
    ';';
  log(query);
  try {
    const result = await sql`
      ${query}
    `.execute(db);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  res.send('Fichier uploadé avec succès!');
});

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
      .select((eb) => [
        'id',
        jsonArrayFrom(
          eb
            .selectFrom('recipe')
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
            .whereRef('recipe.cocktail_id', '=', 'cocktail.id'),
        ).as('ingredients'),

        jsonArrayFrom(
          eb
            .selectFrom('recipe')
            .innerJoin('action', 'recipe.action_id', 'action.id')
            .innerJoin('tool', 'action.tool_id', 'tool.id')
            .select([
              'tool.id as tool_id',
              'tool.name as tool_name',
              'tool.image as tool_image',
            ])
            .whereRef('recipe.cocktail_id', '=', 'cocktail.id'),
        ).as('tools'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail_topping')
            .innerJoin('topping', 'cocktail_topping.topping_id', 'topping.id')
            .select([
              'topping.id as topping_id',
              'topping.name as topping_name',
              'cocktail_topping.quantity as topping_quantity',
            ])
            .whereRef('cocktail_topping.cocktail_id', '=', 'cocktail.id'),
        ).as('toppings'),
      ])
      .where('cocktail.id', '=', Number.parseInt(id))
      .executeTakeFirst();

    if (!cocktail) {
      return res.status(404).send('Cocktail not found');
    }

    res.json({ cocktail });
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
