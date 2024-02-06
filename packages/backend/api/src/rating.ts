import express from 'express';

import { db } from '@app/backend-shared';

const ratingRouter = express.Router();

// Ajouter une note en base de données
ratingRouter.post('/:id', async (req, res) => { 
  const score = req.body.score;
  const cocktailId = req.params.id;
  const userId = 2;
  const createdAt = new Date();

  try {
    await db
      .insertInto('rating')
      .values({
        user_id: userId,
        cocktail_id: Number.parseInt(cocktailId),
        score: score.toString(),
        created_at: createdAt,
      })
      .execute();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { ratingRouter };
