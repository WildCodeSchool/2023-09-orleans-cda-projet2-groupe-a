import express from 'express';
import type { Request, Response } from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { Ingredient, UpdateData } from '@app/types';
import type { ActionTable, Flavour } from '@app/types';

import blockNotLogin from './middlewares/block-not-login';
import checkAuthState from './middlewares/check-auth-state';
import multerConfig from './middlewares/multer-config';
import validateCocktailAdd from './middlewares/validate-cocktail-add';

const cocktailRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
  isloggedIn?: boolean;
}

cocktailRouter.post(
  '/add',
  checkAuthState,
  blockNotLogin,
  validateCocktailAdd,
  async (req: RequestWithUser, res: Response) => {
    const { name, glass, ingredients, alcohol, topping } = req.body;
    const userId = req.userId;

    const verb: ActionTable['verb'][] = [
      'muddle',
      'stir',
      'shake',
      'strain',
      'build',
      'mix',
      'pour',
      'garnish',
      'twist',
      'spritz',
      'layer',
      'float',
      'rim',
      'ignite',
      'blend',
      'top',
      'chill',
      'heat',
      'smoke',
      'double strain',
      'express',
      'infuse',
      'dissolve',
      'whip',
      'squeeze',
      'roll',
      'dash',
      'steam',
      'blast chill',
      'carbonate',
      'mist',
      'stir-fry',
    ];

    try {
      const shaker = await db.transaction().execute(async (trx) => {
        const allIngredients = [...ingredients, alcohol];

        let totalQuantity = 0;
        let totalkcal = 0;
        let totalComplexity = 0;
        let totalDuration = 0;
        const quantity: number[] = [];
        const kcal = [];
        const complexity: number[] = [];
        const duration: number[] = [];
        const flavors = [];
        const counts = {
          fruity: 0,
          spicy: 0,
          herbaceous: 0,
          floral: 0,
          woody: 0,
          bitter: 0,
          sweet: 0,
          salty: 0,
          sour: 0,
          neutral: 0,
        };
        let maxCount = 0;
        let maxItems = [];

        // eslint-disable-next-line unicorn/no-array-reduce
        const data = allIngredients.reduce((ingredient: Ingredient) => {
          const numberQuantity = Math.floor(Math.random() * 10 + 1);
          const numberComplexity = Math.floor(Math.random() * 10 + 1);
          const numberDuration = Math.floor(Math.random() * 10 + 1);
          totalQuantity += numberQuantity;
          totalComplexity += numberComplexity;
          totalDuration += numberDuration;
          totalkcal += ingredient.kcal;
          quantity.push(numberQuantity);
          complexity.push(numberComplexity);
          duration.push(numberDuration);
          kcal.push(ingredient.kcal);
          flavors.push(ingredient.flavour);

          counts[ingredient.flavour] = (counts[ingredient.flavour] || 0) + 1;
          if (counts[ingredient.flavour] > maxCount) {
            maxCount = counts[ingredient.flavour];
            maxItems = [ingredient.flavour];
          } else if (counts[ingredient.flavour] === maxCount) {
            maxItems.push(ingredient.flavour);
          }
        });

        const finalFlavour: Flavour =
          data.maxItems[Math.floor(Math.random() * data.maxItems.length)];

        const createdAt = new Date();

        const cocktail = await trx
          .insertInto('cocktail')
          .values({
            name: name,
            glass_id: glass.id,
            total_degree: 23,
            total_kcal: totalkcal,
            created_at: createdAt,
            author: userId,
            final_flavour: finalFlavour,
            total_quantity: totalQuantity,
          })
          .executeTakeFirstOrThrow();

        const cocktailId = cocktail.insertId;

        if (cocktailId === undefined) {
          return res.status(404).send('Cocktail not found');
        }

        let index = 0;
        for (const ingredient of allIngredients) {
          const randomVerb = verb[Math.floor(Math.random() * verb.length)];

          const tools = await sql`
            SELECT tool_id, COUNT(*) as frequency
            FROM action
            WHERE verb = ${randomVerb}
            GROUP BY tool_id
            ORDER BY frequency DESC
            LIMIT 1
          `.execute(trx);

          const toolId =
            tools.rows.length > 0
              ? (tools.rows[0] as { tool_id: number }).tool_id
              : Math.random() * 10;

          const action = await trx
            .insertInto('action')
            .values({
              verb: randomVerb,
              priority: Math.floor(Math.random() * 10),
              tool_id: toolId,
              duration: duration[index],
              complexity: complexity[index],
              is_mandatory: [true, false][Math.floor(Math.random() * 2)],
            })
            .executeTakeFirstOrThrow();

          const actionId = action.insertId;

          if (actionId === undefined) {
            return res.status(404).send('action not found');
          }

          await trx
            .insertInto('action_ingredient')
            .values({
              ingredient_id: ingredient.id,
              action_id: Number(actionId),
              quantity: quantity[index],
            })
            .executeTakeFirstOrThrow();

          await trx
            .insertInto('recipe')
            .values({
              cocktail_id: Number(cocktailId),
              action_id: Number(actionId),
              total_complexity: totalComplexity,
              total_duration: totalDuration,
              step: 1,
            })
            .executeTakeFirstOrThrow();

          index++;
        }

        await trx
          .insertInto('cocktail_topping')
          .values({
            cocktail_id: Number(cocktailId),
            topping_id: topping.id,
            quantity: Math.floor(Math.random() * 10),
          })
          .executeTakeFirst();

        return res.json({ ok: true, cocktailId: Number(cocktailId) });
      });
      res.status(200).json({ cocktailId: Number(shaker) });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

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

export { cocktailRouter };
