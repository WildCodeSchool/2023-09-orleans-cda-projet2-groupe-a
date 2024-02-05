import express from 'express';
import type { UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

import { userSchema } from '../validaton-schemas';

const adminUserRouter = express.Router();

// Route get pour récupérer les utilisateurs présents en BDD
adminUserRouter.get('/', async (req, res) => {
  try {
    const users = await db.selectFrom('user').selectAll().execute();
    const totalCount = users.length;
    res.header('Content-Range', String(totalCount));
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un utilisateur spécifique par son ID
adminUserRouter.get('/:id', async (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const user = await db
      .selectFrom('user')
      .selectAll()
      .where('id', '=', userId)
      .executeTakeFirst();

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un utilisateur spécifique par son ID
adminUserRouter.put('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);

    if (req.body.created_at) {
      const date = new Date(req.body.created_at);
      if (Number.isNaN(date.getTime())) {
        return res.status(400).send('Invalid created_at date format');
      } else {
        req.body.created_at = date.toISOString().slice(0, 19).replace('T', ' ');
      }
    }
    const updateData = req.body;
    const parsedUpdateData = userSchema.parse(updateData) as UpdateObject<
      Database,
      'user',
      'user'
    >;

    const updatedUser = await db
      .updateTable('user')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un utilisateur spécifique par son ID
adminUserRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    await db.deleteFrom('cocktail').where('author', '=', id).execute();
    await db.deleteFrom('favorite').where('user_id', '=', id).execute();
    await db.deleteFrom('comment').where('user_id', '=', id).execute();
    const deletedUser = await db
      .deleteFrom('user')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedUser) {
      res.status(200).send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { adminUserRouter };
