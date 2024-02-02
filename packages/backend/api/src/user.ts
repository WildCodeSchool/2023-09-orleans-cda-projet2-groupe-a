import express from 'express';
import type { Request, Response } from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

import loginIdUser from './middlewares/login-id-user';
import validateUpdateUser from './middlewares/validate-update-user';

interface RequestWithUser extends Request {
  userId?: number;
}

const user = express.Router();

// This SQL query retrieves the following:
// - The user's pseudonym
// - All cocktails posted by this user, including:
//    - The average rating received by their cocktails
//    - The name of each cocktail
//    - The main ingredient of each cocktail (determined by either the highest alcohol content or the highest quantity)
// - All comments posted by the user, including:
//    - The content of each comment
//    - The rating given in each comment
//    - The name of the cocktail associated with each comment

async function getUser(id: number, shouldSelectEmail: boolean) {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      WITH ranked_ingredients AS (
        SELECT 
          cocktail.id AS cocktail_id, 
          ingredient.id, 
          ingredient.name AS ingredient_name, 
          ingredient.family, 
          action_ingredient.quantity, 
          ROW_NUMBER() OVER (
            PARTITION BY cocktail.id 
            ORDER BY CASE WHEN ingredient.family = 'alcool' THEN 0 ELSE 1 END, 
            action_ingredient.quantity DESC
          ) AS rnk 
        FROM cocktail 
        INNER JOIN recipe ON cocktail.id = recipe.cocktail_id 
        INNER JOIN action ON recipe.action_id = action.id 
        INNER JOIN action_ingredient ON action.id = action_ingredient.action_id 
        INNER JOIN ingredient ON action_ingredient.ingredient_id = ingredient.id
      ), 
      cocktails_with_average_rating AS (
        SELECT 
          cocktail.id AS cocktail_id, 
          cocktail.name AS cocktail_name, 
          user.id AS author_id, 
          AVG(
            CASE rating.score 
              WHEN '0.5' THEN 0.5 
              WHEN '1' THEN 1 
              WHEN '1.5' THEN 1.5 
              WHEN '2' THEN 2 
              WHEN '2.5' THEN 2.5 
              WHEN '3' THEN 3 
              WHEN '3.5' THEN 3.5 
              WHEN '4' THEN 4 
              WHEN '4.5' THEN 4.5 
              WHEN '5' THEN 5 
              WHEN '5.5' THEN 5.5 
              WHEN '6' THEN 6 
              WHEN '6.5' THEN 6.5 
              WHEN '7' THEN 7 
              WHEN '7.5' THEN 7.5 
              WHEN '8' THEN 8 
              WHEN '8.5' THEN 8.5 
              WHEN '9' THEN 9 
              WHEN '9.5' THEN 9.5 
              WHEN '10' THEN 10 
              ELSE 0 
            END
          ) AS avg_rating 
        FROM user 
        INNER JOIN cocktail ON user.id = cocktail.author 
        LEFT JOIN rating ON cocktail.id = rating.cocktail_id 
        WHERE user.id = ${id} 
        GROUP BY cocktail.id, cocktail.name, user.id
      ) 
      SELECT 
        user.pseudo, 
        user.image,
        user.color,
        ${shouldSelectEmail ? sql`user.email` : ''},
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'cocktail_id', ci.cocktail_id, 
                'cocktail_name', ci.cocktail_name, 
                'avg_rating', ci.avg_rating, 
                'ingredient_name', ri.ingredient_name, 
                'family', ri.family
              )
            ) 
          FROM cocktails_with_average_rating ci 
          JOIN ranked_ingredients ri ON ci.cocktail_id = ri.cocktail_id AND ri.rnk = 1 
          WHERE user.id = ci.author_id
        ) AS cocktails, 
        (
          SELECT 
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'comment_id', comment.id, 
                'content', comment.content, 
                'cocktail_name', cocktail.name, 
                'score', rating.score, 
                'cocktail_id', cocktail.id
              )
            ) 
          FROM comment 
          LEFT JOIN cocktail ON comment.cocktail_id = cocktail.id 
          LEFT JOIN rating ON user.id = rating.user_id AND cocktail.id = rating.cocktail_id 
          WHERE user.id = comment.user_id
        ) AS comments 
      FROM user 
      WHERE user.id = ${id};
    `.execute(trx);

    return result.rows;
  });
}

async function getAllUsers() {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT 
        user.id, 
        user.pseudo, 
        user.image, 
        user.color,
        COUNT(cocktail.id) AS cocktail_count,
        AVG(
          CASE rating.score 
          WHEN '0.5' THEN 0.5 
          WHEN '1' THEN 1 
          WHEN '1.5' THEN 1.5 
          WHEN '2' THEN 2 
          WHEN '2.5' THEN 2.5 
          WHEN '3' THEN 3 
          WHEN '3.5' THEN 3.5 
          WHEN '4' THEN 4 
          WHEN '4.5' THEN 4.5 
          WHEN '5' THEN 5 
          WHEN '5.5' THEN 5.5 
          WHEN '6' THEN 6 
          WHEN '6.5' THEN 6.5 
          WHEN '7' THEN 7 
          WHEN '7.5' THEN 7.5 
          WHEN '8' THEN 8 
          WHEN '8.5' THEN 8.5 
          WHEN '9' THEN 9 
          WHEN '9.5' THEN 9.5 
          WHEN '10' THEN 10 
          END
        ) AS average_rating
        FROM user 
        LEFT JOIN cocktail ON user.id = cocktail.author
        LEFT JOIN rating ON cocktail.id = rating.cocktail_id
        GROUP BY user.id;
    `.execute(trx);

    return result.rows;
  });
}

user.get('/profile', loginIdUser, async (req: RequestWithUser, res) => {
  const id = req.userId;
  const shouldSelectEmail = true;
  if (id == null) {
    res.json({ ok: false, message: 'not connected' });
    return;
  }

  try {
    const result = await getUser(id, shouldSelectEmail);
    res.json(result[0]);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

user.get('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id);
  const shouldSelectEmail = false;

  try {
    const result = await getUser(id, shouldSelectEmail);

    res.json(result[0]);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

user.get('/', async (req, res) => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

interface Updates {
  pseudo?: string;
  image?: string;
  password?: string;
  color?: string;
}

user.put(
  '/update',
  loginIdUser,
  validateUpdateUser,
  async (req: RequestWithUser, res: Response) => {
    const userId = req.userId;

    if (userId == null) {
      return res.json({ ok: false, message: 'not connected' });
    }

    const {
      pseudo,
      image,
      color,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;

    try {
      const updates: Updates = {};
      if (pseudo) updates.pseudo = pseudo;
      if (image) updates.image = image;
      if (color) updates.color = color;

      if (currentPassword) {
        const user = await db
          .selectFrom('user')
          .select(['user.password'])
          .where('user.id', '=', userId)
          .executeTakeFirst();

        if (user === undefined) {
          return res.json({ ok: false, message: 'user not found' });
        }

        if (newPassword !== confirmNewPassword) {
          return res.json({ ok: false, message: 'password do not match' });
        }

        const isCorrectPassword = await Bun.password.verify(
          currentPassword,
          user.password,
          'bcrypt',
        );

        if (!isCorrectPassword) {
          return res.json({ ok: false, message: 'wrong password' });
        }

        const hashedPassword = await Bun.password.hash(newPassword, {
          algorithm: 'bcrypt',
          cost: 15,
        });

        updates.password = hashedPassword;
      }

      await db
        .updateTable('user')
        .set(updates)
        .where('user.id', '=', userId)
        .executeTakeFirst();

      res.json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
);

export { user };
