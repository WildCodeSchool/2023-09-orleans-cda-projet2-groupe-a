import express from 'express';

import { db } from '@app/backend-shared';

const ratingRouter = express.Router();

// Ajouter une note en base de données
ratingRouter.post('/:id', async (req, res) => {
  const { userId, score } = req.body;
  const cocktailId = req.params.id;
  const createdAt = new Date();
  if (score < 1 || score > 5 || !userId || !cocktailId) {
    res.status(400).send('Bad Request');
  } else {
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
  }
});

export { ratingRouter };
