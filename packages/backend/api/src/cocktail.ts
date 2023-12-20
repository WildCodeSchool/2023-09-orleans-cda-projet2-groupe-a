import express from 'express';

import { db } from '@app/backend-shared';

const cocktailRouter = express.Router();

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
  try {
    const cocktailsWithAlcohol = await db
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
        'cocktail.id',
        'cocktail.name',
        'cocktail.image',
        'cocktail.ratings_average',
        'cocktail.created_at',
      ])
      .where('ingredient.family', '=', 'alcohol')
      .orderBy('cocktail.name', 'asc')
      .groupBy('cocktail.id')
      .execute();

    res.json({ cocktailsWithAlcohol });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

cocktailRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const cocktails = await db
      .selectFrom('cocktail')
      .selectAll()
      .where('id', '=', Number.parseInt(id))
      .executeTakeFirst();

    res.json({ cocktails });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

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
      .executeTakeFirst();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { cocktailRouter };
