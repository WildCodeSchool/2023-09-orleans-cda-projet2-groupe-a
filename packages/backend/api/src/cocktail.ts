import express from 'express';
import type { Request, Response } from 'express';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';
import type { UpdateData } from '@app/types';
import type { ActionTable, Flavour } from '@app/types';

import multerConfig from './middlewares/multer-config';
import validateCocktailAdd from './middlewares/validate-cocktail-add';

// import loginIdUser from './middlewares/login-id-user';

const cocktailRouter = express.Router();

interface RequestWithUser extends Request {
  userId?: number;
}

// cocktailRouter.post('/add', loginIdUser, validateCocktailAdd, async (req: RequestWithUser, res: Response) => {
cocktailRouter.post(
  '/add',
  validateCocktailAdd,
  async (req: RequestWithUser, res: Response) => {
    const { name, glass, ingredients, alcohol, topping } = req.body;
    const userId = 1;
    /* const userId = req.userId; */

    /*  if (userId === undefined) {
    return res.json({ result: 'not connected' });
  } */
    const probability = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5,
    ];

    const howMuchMoreIngredients = Math.floor(
      Math.random() * probability.length,
    );

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
        const moreIngredientArray = await db
          .selectFrom('ingredient')
          .selectAll()
          .where('ingredient.id', 'not in', [
            ingredients[0],
            ingredients[1],
            ingredients[2],
          ])
          .orderBy(sql`rand()`)
          .limit(probability[howMuchMoreIngredients])
          .execute();

        const allIngredients = [
          ...ingredients,
          alcohol,
          ...moreIngredientArray,
        ];

        let totalQuantity = 0;
        let totalkcal = 0;
        let totalComplexity = 0;
        let totalDuration = 0;
        const quantity: number[] = [];
        const kcal: number[] = [];
        const complexity: number[] = [];
        const duration: number[] = [];
        const flavors: Flavour[] = [];

        for (const allIngredient of allIngredients) {
          const numberQuantity = Math.floor(Math.random() * 10 + 1);
          const numberComplexity = Math.floor(Math.random() * 10 + 1);
          const numberDuration = Math.floor(Math.random() * 10 + 1);
          totalQuantity = totalQuantity + numberQuantity;
          totalComplexity = totalComplexity + numberComplexity;
          totalDuration = totalDuration + allIngredient.kcal;
          totalkcal = totalkcal + numberDuration;
          quantity.push(numberQuantity);
          complexity.push(numberComplexity);
          duration.push(numberDuration);
          kcal.push(allIngredient.kcal);
          flavors.push(allIngredient.flavour);
        }

        const counts: { [key in Flavour]: number } = {
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
        let maxItems: Flavour[] = [];

        flavors.map((flavor) => {
          counts[flavor] = (counts[flavor] || 0) + 1;
          if (counts[flavor] > maxCount) {
            maxCount = counts[flavor];
            maxItems = [flavor];
          } else if (counts[flavor] === maxCount) {
            maxItems.push(flavor);
          }
        });
        const finalFlavour: Flavour =
          maxItems[Math.floor(Math.random() * maxItems.length)];

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

        return cocktailId;
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
