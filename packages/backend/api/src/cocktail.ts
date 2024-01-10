import express from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { ActionTable, Ingredient } from '@app/types';

import { ingredient } from './ingredient';

const cocktailRouter = express.Router();

interface ToolsCount {
  'COUNT(*)': number;
}

cocktailRouter.post('/add', async (req, res) => {
  const { name, glass, ingredients, alcohol, topping } = req.body;

  const probability = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5,
  ];

  const howMuchMoreIngredients = Math.floor(Math.random() * probability.length);

  const createdAt = new Date();

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
      const ingredientsCount =
        await sql`SELECT COUNT(*) FROM ingredient`.execute(trx);
      const ingredientsTotal = (ingredientsCount.rows[0] as ToolsCount)[
        'COUNT(*)'
      ];

      const moreIngredientsPromises = Array.from(
        { length: probability[howMuchMoreIngredients] },
        async (_, index: number) => {
          const randomId = Math.floor(Math.random() * ingredientsTotal);
          const ingredients = await trx
            .selectFrom('ingredient')
            .selectAll()
            .where('id', '=', randomId)
            .limit(1)
            .execute();

          return ingredients[0];
        },
      );

      const moreIngredients = await Promise.all(moreIngredientsPromises);
      const allIngredients = [...ingredients, alcohol, ...moreIngredients];

      console.log(allIngredients);

      /*       const totalKcal = allIngredients.reduce((acc, ingredient) => {
        return ingredient.kcal + acc;
      }, 0);
      console.log(totalKcal);
      console.log(typeof totalKcal); */

      /*    const flavor :string[] = allIngredients.map((ingredient) :string => {
       return ingredient.flavour} ); */

      /*    const finalFlavour = flavor.reduce
      console.log(flavor);  */

      const cocktail = await trx
        .insertInto('cocktail')
        .values({
          name: name,
          glass_id: glass.id,
          total_degree: 23,
          total_kcal: 1,
          created_at: createdAt,
          author: 1,
          final_flavour: 'fruity',
          total_quantity: 120,
        })
        .executeTakeFirstOrThrow();

      const [lastCocktail] = await trx
        .selectFrom('cocktail')
        .selectAll()
        .orderBy('id', 'desc')
        .limit(1)
        .execute();

      const cocktailId = lastCocktail.id;

      for (const [index, ingredient] of allIngredients.entries()) {
        const tools = await sql`SELECT COUNT(*) FROM tool`.execute(trx);
        const toolCount = (tools.rows[0] as ToolsCount)['COUNT(*)'];

        const randomIndex = Math.floor(Math.random() * verb.length);
        await trx
          .insertInto('action')
          .values({
            verb: verb[randomIndex],
            priority: Math.floor(Math.random() * 10),
            tool_id: Math.floor(Math.random() * toolCount),
            duration: Math.floor(Math.random() * 10),
            complexity: Math.floor(Math.random() * 10),
            is_mandatory: [true, false][Math.floor(Math.random() * 2)],
          })
          .executeTakeFirstOrThrow();

        const [lastAction] = await trx
          .selectFrom('action')
          .selectAll()
          .orderBy('id', 'desc')
          .limit(1)
          .execute();

        const actionId = lastAction.id;

        await trx
          .insertInto('action_ingredient')
          .values({
            ingredient_id: ingredient.id,
            action_id: actionId,
            quantity: Math.floor(Math.random() * 10),
          })
          .executeTakeFirstOrThrow();

        await trx
          .insertInto('recipe')
          .values({
            cocktail_id: cocktailId,
            action_id: actionId,
            total_complexity: 1,
            total_duration: 1,
            step: 1,
          })
          .executeTakeFirstOrThrow();
      }

      await trx
        .insertInto('cocktail_topping')
        .values({
          cocktail_id: cocktailId,
          topping_id: topping.id,
          quantity: Math.floor(Math.random() * 10),
        })
        .executeTakeFirst();

      return cocktailId;
    });
    res.status(200).json({ cocktailId: shaker });
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
