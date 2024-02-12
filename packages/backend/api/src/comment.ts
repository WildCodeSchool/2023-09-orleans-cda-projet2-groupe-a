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
// commentRouter.post('/:id', async (req, res) => {
//   const { content } = req.body;
//   const createdAt = new Date();
//   const cocktailId = req.params.id;
//   const userId = req.params.id;

//   try {
//     await db
//       .insertInto('comment')
//       .values({
//         user_id: Number.parseInt(userId),
//         cocktail_id: Number.parseInt(cocktailId),
//         content: content,
//         created_at: createdAt,
//       })
//       .execute();

//     res.json({ ok: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

commentRouter.post('/:id', async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir de la session ou du token
    const userId = req.userId; // Cela dépend de votre système d'authentification
    const commentId = req.params.id;
    const newCommentText = req.body.comment;

    // Vérifier que l'utilisateur est authentifié
    if (!userId) {
      return res
        .status(401)
        .send('Vous devez être connecté pour éditer un commentaire.');
    }

    // Récupérer le commentaire de la base de données
    const comment = await db
      .selectFrom('comments')
      .where('id', '=', commentId)
      .execute();

    // Vérifier que le commentaire existe et que l'utilisateur a le droit de l'éditer
    if (!comment || comment.userId !== userId) {
      return res
        .status(403)
        .send("Vous n'avez pas le droit d'éditer ce commentaire.");
    }

    // Mettre à jour le commentaire avec le nouveau texte
    await db
      .updateTable('comments')
      .set({
        comment: newCommentText,
        // Vous pouvez également mettre à jour la date de la dernière édition si nécessaire
      })
      .where('id', '=', commentId)
      .execute();

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur.');
  }
});

export { commentRouter };
