import express from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { Flavour } from '@app/types';
import type { UpdateData } from '@app/types';

import multerConfig from './middlewares/multer-config';

const cocktailRouter = express.Router();

// Route post pour uploader un fichier
cocktailRouter.post('/:id/upload', multerConfig, async (req, res) => {
  const cocktailId = Number.parseInt(req.params.id);
  const anecdote = req.body.anecdote === '' ? null : req.body.anecdote;
  const cocktailPicName = req.file ? req.file.filename : null;
  const updateData: UpdateData = {};

  if (anecdote !== null) {
    updateData.anecdote = anecdote;
  }
  if (cocktailPicName !== null) {
    updateData.image = cocktailPicName;
  }

  try {
    const result = await db
      .updateTable('cocktail')
      .set(updateData)
      .where('id', '=', cocktailId)
      .execute();
    res.send('Fichier uploadé avec succès!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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

cocktailRouter.get('/alcohol', async (req, res) => {
  const ingredients = req.query.ingredients;
  const flavours = req.query.flavours;
  const kcals = req.query.kcals;
  const complexities = req.query.complexities;
  const degrees = req.query.degrees;
  const searchTerm = req.query.searchTerm;

  try {
    let query = db
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
        'cocktail.id as cocktail_id',
        'cocktail.name as cocktail_name',
        'cocktail.image as cocktail_image',
        'cocktail.ratings_average as avg_rating',
        'cocktail.created_at as cocktail_created',
        'cocktail.final_flavour as cocktail_flavour',
        'cocktail.total_kcal as cocktail_kcal',
      ])
      .groupBy('cocktail.id')
      .orderBy('cocktail.name');

    if (searchTerm !== undefined) {
      query = query.where((eb) =>
        eb.or([
          eb('ingredient.name', 'like', `%${String(searchTerm)}%`),
          eb('cocktail.name', 'like', `%${String(searchTerm)}%`),
        ]),
      );
    }

    if (ingredients !== undefined) {
      const ingredientList: string[] = Array.isArray(ingredients)
        ? ingredients.map(String)
        : [String(ingredients)];

      const countDistinctIngredients = sql<string>`COUNT(DISTINCT ingredient.name)`;

      query = query
        .having(countDistinctIngredients, '=', sql`${ingredientList.length}`)
        .where('ingredient.name', 'in', ingredientList);
    }

    if (flavours !== undefined) {
      const flavourList: Flavour[] = (
        Array.isArray(flavours) ? flavours.map(String) : [String(flavours)]
      ) as Flavour[];

      const countDistinctFlavours = sql<string>`COUNT(DISTINCT cocktail.final_flavour)`;

      query = query
        .having(countDistinctFlavours, '=', sql`${flavourList.length}`)
        .where('cocktail.final_flavour', 'in', flavourList);
    }

    if (kcals !== undefined) {
      const kcalList: number[] = Array.isArray(kcals)
        ? kcals.map(Number)
        : [Number(kcals)];

      const countDistinctKcals = sql<string>`COUNT(DISTINCT cocktail.total_kcal)`;

      query = query
        .having(countDistinctKcals, '=', sql`${kcalList.length}`)
        .where('cocktail.total_kcal', 'in', kcalList);
    }

    if (complexities !== undefined) {
      const complexityList: number[] = Array.isArray(complexities)
        ? complexities.map(Number)
        : [Number(complexities)];

      const countDistinctComplexity = sql<string>`COUNT(DISTINCT recipe.total_complexity)`;

      query = query
        .having(countDistinctComplexity, '=', sql`${complexityList.length}`)
        .where('recipe.total_complexity', 'in', complexityList);
    }

    if (degrees !== undefined) {
      const degreeList: number[] = Array.isArray(degrees)
        ? degrees.map(Number)
        : [Number(degrees)];

      const countDistinctDegree = sql<string>`COUNT(DISTINCT cocktail.total_degree)`;

      query = query
        .having(countDistinctDegree, '=', sql`${degreeList.length}`)
        .where('cocktail.total_degree', 'in', degreeList);
    }

    const cocktailsFilter = await query.execute();
    res.json({ cocktails: cocktailsFilter });
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
