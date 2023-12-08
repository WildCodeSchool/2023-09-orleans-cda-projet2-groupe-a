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
