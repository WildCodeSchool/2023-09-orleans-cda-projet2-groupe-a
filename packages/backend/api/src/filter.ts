import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const filterRouter = express.Router();

// Route get pour récupérer tous les paramètres de la barre filtre
filterRouter.get('/', async (req, res) => {
  try {
    const filters = await db
      .selectFrom('cocktail')
      .select((eb) => [
        jsonArrayFrom(
          eb
            .selectFrom('ingredient')
            .select([
              'ingredient.id as id',
              'ingredient.name as name',
              'ingredient.family as ingredient_family',
            ])
            .where('ingredient.family', '!=', 'alcohol')
            .orderBy('ingredient.name', 'asc'),
        ).as('ingredients'),

        jsonArrayFrom(
          eb
            .selectFrom('ingredient')
            .select([
              'ingredient.id as id',
              'ingredient.name as name',
              'ingredient.family as alcohol_family',
            ])
            .where('ingredient.family', '=', 'alcohol')
            .orderBy('ingredient.name', 'asc'),
        ).as('alcohols'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail')
            .select(['cocktail.final_flavour as name'])
            .distinct()
            .orderBy('cocktail.final_flavour', 'asc'),
        ).as('flavours'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail')
            .select('cocktail.total_kcal as name')
            .distinct()
            .orderBy('cocktail.total_kcal', 'asc'),
        ).as('kcals'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail')
            .select(['cocktail.total_degree as name'])
            .distinct()
            .orderBy('cocktail.total_degree', 'asc'),
        ).as('degrees'),

        jsonArrayFrom(
          eb
            .selectFrom('recipe')
            .select(['recipe.total_complexity as name'])
            .distinct()
            .orderBy('recipe.total_complexity', 'asc'),
        ).as('complexities'),
      ])
      .executeTakeFirst();

    if (!filters) {
      return res.status(404).send('Cocktail not found');
    }
    res.json({ filters });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { filterRouter };
