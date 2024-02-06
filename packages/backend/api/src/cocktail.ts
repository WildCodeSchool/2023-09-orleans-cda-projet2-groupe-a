import express from 'express';
import type { Request } from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { Flavour } from '@app/types';
import type { UpdateData } from '@app/types';

import checkAuthState from './middlewares/check-auth-state';
import multerConfig from './middlewares/multer-config';

const cocktailRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
  isloggedIn?: boolean;
}

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
    if (req.file) {
      res.json({ message: 'Upload successful!', fileName: req.file.filename });
    } else {
      res.status(400).send('No file uploaded.');
    }
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

cocktailRouter.get(
  '/alcohol',
  checkAuthState,
  async (req: RequestWithUser, res) => {
    const ingredients = req.query.ingredients;
    const flavours = req.query.flavours;
    const kcals = req.query.kcals;
    const complexities = req.query.complexities;
    const degrees = req.query.degrees;
    const searchTerm = req.query.searchTerm;

    const userId = req.userId;
    const isloggedIn = req.isloggedIn;

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
        .leftJoin('favorite', 'favorite.cocktail_id', 'cocktail.id')
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

      if (isloggedIn) {
        query = query.select(
          sql`EXISTS(SELECT 1 FROM favorite WHERE favorite.cocktail_id = cocktail.id AND favorite.user_id = ${userId})`.as(
            'is_favorite',
          ),
        );
      }

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
  },
);

// Route get pour récupérer les cocktails par id présents en BDD
cocktailRouter.get(
  '/:id',
  checkAuthState,
  async (req: RequestWithUser, res) => {
    const id = req.params.id;
    const userId = req.userId;
    const isloggedIn = req.isloggedIn;

    try {
      let query = db
        .selectFrom('cocktail')
        .selectAll()
        .select((eb) => [
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
        .where('cocktail.id', '=', Number.parseInt(id));

      if (isloggedIn) {
        query = query.select(
          sql`(SELECT CASE WHEN EXISTS (SELECT 1 FROM favorite WHERE favorite.cocktail_id = cocktail.id AND favorite.user_id = ${userId}) THEN 1 ELSE 0 END)`.as(
            'is_favorite',
          ),
        );
      }

      const cocktail = await query.executeTakeFirstOrThrow();

      if (!cocktail) {
        return res.status(404).send('Cocktail not found');
      }

      res.json({ cocktail });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

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

cocktailRouter.get('/:id/suggestion', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid cocktail ID' });
    }

    // requête pour obtenir les id des ingrédients du cocktail sélectionné
    const ingredientSubquery = db
      .selectFrom('action_ingredient')
      .innerJoin('action', 'action_ingredient.action_id', 'action.id')
      .innerJoin('recipe', 'action.id', 'recipe.action_id')
      .where('recipe.cocktail_id', '=', id)
      .select(['ingredient_id']);

    const countCommonIngredients = sql<string>`COUNT(DISTINCT action_ingredient.ingredient_id)`;

    // Requête principale pour obtenir les cocktails avec le plus d'ingrédients en commun
    const cocktailsWithCommonIngredients = await db
      .selectFrom('cocktail')
      .select([
        'cocktail.id',
        'cocktail.name',
        'cocktail.image',
        'cocktail.ratings_average',
        countCommonIngredients.as('common_ingredients_count'),
      ])
      .innerJoin('recipe', 'cocktail.id', 'recipe.cocktail_id')
      .innerJoin('action', 'recipe.action_id', 'action.id')
      .innerJoin(
        'action_ingredient',
        'action.id',
        'action_ingredient.action_id',
      )
      .where('action_ingredient.ingredient_id', 'in', ingredientSubquery)
      .where('cocktail.id', '!=', id)
      .groupBy('cocktail.id')
      .having(countCommonIngredients, '>', sql`0`)
      .orderBy('common_ingredients_count', 'desc')
      .limit(3)
      .execute();

    return res.json(cocktailsWithCommonIngredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { cocktailRouter };
