import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const filterRouter = express.Router();

// Route get pour récupérer les cocktails présents en BDD
filterRouter.get('/', async (req, res) => {
  try {
    const cocktail = await db
      .selectFrom('cocktail')
      .selectAll()
      .select((eb) => [
        jsonArrayFrom(
          eb
            .selectFrom('ingredient')

            .select([
              'ingredient.id as ingredient_id',
              'ingredient.name as ingredient_name',
              'ingredient.family as ingredient_family',
            ])
            .where('ingredient.family', '!=', 'alcohol')
            .orderBy('ingredient.name', 'asc'),
        ).as('ingredients'),

        jsonArrayFrom(
          eb
            .selectFrom('ingredient')

            .select([
              'ingredient.id as alcohol_id',
              'ingredient.name as alcohol_name',
              'ingredient.family as alcohol_family',
            ])
            .where('ingredient.family', '=', 'alcohol')
            .orderBy('ingredient.name', 'asc'),
        ).as('alcohols'),
      ])

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

export { filterRouter };
