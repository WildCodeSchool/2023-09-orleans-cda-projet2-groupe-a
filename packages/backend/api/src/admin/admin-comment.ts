import express from 'express';
import type { UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

const adminCommentRouter = express.Router();

// Route get pour récupérer les commentaires présents en BDD
adminCommentRouter.get('/', async (req, res) => {
  try {
    const comments = await db.selectFrom('comment').selectAll().execute();
    const totalCount = comments.length;
    res.header('Content-Range', String(totalCount));
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un commentaire spécifique par son ID
adminCommentRouter.get('/:id', async (req, res) => {
  try {
    const commentId = Number.parseInt(req.params.id);
    const comment = await db
      .selectFrom('comment')
      .selectAll()
      .where('id', '=', commentId)
      .executeTakeFirst();

    if (comment) {
      res.json(comment);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Je ne fais pas de PUT pour comment, il ne me semble pas cohérent de permettre à l'admin de modifier les commentaires, juste les supprimer si besoin.

// Route DELETE pour supprimer un commentaire spécifique par son ID
adminCommentRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);

    const deletedComment = await db
      .deleteFrom('comment')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedComment) {
      res.status(200).send('Comment deleted successfully');
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { adminCommentRouter };
