import express from 'express';

import { db } from '@app/backend-shared';

const commentRouter = express.Router();

// Route get pour récupérer les commentaires présents en BDD
commentRouter.get('/', async (req, res) => {
  try {
    const comments = await db.selectFrom('comment').selectAll().execute();
    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les cocktails par id présents en BDD
commentRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const commentsByUserIdCocktailId = await db
      .selectFrom('comment')
      .selectAll()
      .where('cocktail_id', '=', Number.parseInt(id))
      .orderBy('created_at', 'desc')
      .execute();

    const ratings = await db
      .selectFrom('rating')
      .selectAll()
      .where('cocktail_id', '=', Number.parseInt(id))
      .execute();

    res.json({ commentsByUserIdCocktailId, ratings });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Ajouter un commentaire en base de donnée
commentRouter.post('/:id', async (req, res) => {
  const { content } = req.body;
  const createdAt = new Date();
  // const { cocktailId, userId } = req.body;
  const cocktailId = req.params.id;
  const userId = 1;

  try {
    await db
      .insertInto('comment')
      .values({
        user_id: userId,
        cocktail_id: Number.parseInt(cocktailId),
        content: content,
        created_at: createdAt,
      })
      .execute();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { commentRouter };
