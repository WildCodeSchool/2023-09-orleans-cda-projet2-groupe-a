import express from 'express';
import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

const filterRouter = express.Router();

// Route get pour récupérer tous les paramètres de la barre filtre
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

        jsonArrayFrom(
          eb
            .selectFrom('cocktail')
            .select(['final_flavour as cocktail_flavour'])
            .distinct()
            .orderBy('cocktail.final_flavour', 'asc'),
        ).as('flavours'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail')
            .select('total_kcal as cocktail_kcal')
            .distinct()
            .orderBy('cocktail.total_kcal', 'asc'),
        ).as('kcals'),

        jsonArrayFrom(
          eb
            .selectFrom('cocktail')
            .select(['total_degree as cocktail_degree'])
            .distinct()
            .orderBy('cocktail.total_degree', 'asc'),
        ).as('degrees'),

        jsonArrayFrom(
          eb
            .selectFrom('recipe')
            .select(['total_complexity as cocktail_complexity'])
            .distinct()
            .orderBy('recipe.total_complexity', 'asc'),
        ).as('complexities'),
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

filterRouter.get('/:search', async (req, res) => {
  const search = `%${req.params.search}%`;
  const searchBar = await db
    .selectFrom('cocktail')
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom('ingredient')
          .select(['ingredient.id', 'ingredient.name'])
          .where('ingredient.name', 'like', search)
          .orderBy('ingredient.name', 'asc'),
      ).as('findIngredient'),

      jsonArrayFrom(
        eb
          .selectFrom('cocktail')
          .select(['cocktail.id', 'cocktail.name'])
          .where('cocktail.name', 'like', search)
          .orderBy('cocktail.name', 'asc'),
      ).as('findCocktail'),
    ])
    .executeTakeFirst();

  return res.json({ searchBar });
});

export { filterRouter };
