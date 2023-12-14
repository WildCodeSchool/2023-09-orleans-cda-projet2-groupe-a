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
    const comment = await db
      .selectFrom('cocktail')
      .selectAll()
      .where('id', '=', Number.parseInt(id))
      .executeTakeFirst();

    if (!comment) {
      return res.status(404).send('Cocktail not found');
    }

    const comments = await db
      .selectFrom('cocktail')
      .innerJoin('comment', 'comment.id', 'cocktail.id')
      .innerJoin('rating', 'cocktail.id', 'rating.cocktail_id')
      .select([
        'cocktail.final_flavour as cocktail_flavour',
        'comment.id as comment_id',
        'comment.cocktail_id as comment_cocktail_id',
        'cocktail.name as cocktail_name',
        'cocktail.id as cocktail_id',
        'comment.user_id as comment_user',
        'comment.content as comment_content',
        'rating.user_id as rating_user',
        'rating.score as rating_score',
      ])
      .where('cocktail.id', '=', Number.parseInt(id))
      .execute();

    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Ajouter un commentaire en base de donnée
commentRouter.post('/:id', async (req, res) => {
  const cocktailId = Number.parseInt(req.params.id, 10);
  const { content } = req.body;
  const userId = 1;
  const createdAt = new Date();

  try {
    await db
      .insertInto('comment')
      .values({
        user_id: userId,
        cocktail_id: cocktailId,
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
