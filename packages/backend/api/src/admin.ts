import express from 'express';
import type { UpdateObject } from 'kysely';

import { db } from '@app/backend-shared';
import type { Database } from '@app/types';

import {
  cocktailSchema,
  glassSchema,
  ingredientSchema,
  toppingSchema,
  userSchema,
} from './validaton-schemas';

const adminRouter = express.Router();

// Route get pour récupérer les cocktails présents en BDD
adminRouter.get('/cocktail', async (req, res) => {
  try {
    const cocktails = await db.selectFrom('cocktail').selectAll().execute();
    const totalCount = cocktails.length;
    res.header('Content-Range', String(totalCount));
    res.json(cocktails);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un cocktail spécifique par son ID
adminRouter.get('/cocktail/:id', async (req, res) => {
  try {
    const cocktailId = Number.parseInt(req.params.id);
    const cocktail = await db
      .selectFrom('cocktail')
      .selectAll()
      .where('id', '=', cocktailId)
      .executeTakeFirst();

    if (cocktail) {
      res.json(cocktail);
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un cocktail spécifique par son ID
adminRouter.put('/cocktail/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = cocktailSchema.parse(updateData) as UpdateObject<
      Database,
      'cocktail',
      'cocktail'
    >;

    const updatedCocktail = await db
      .updateTable('cocktail')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedCocktail) {
      res.json(updatedCocktail);
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un cocktail spécifique par son ID
adminRouter.delete('/cocktail/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    // On doit supprimer les FK d'abord
    await db
      .deleteFrom('cocktail_topping')
      .where('cocktail_id', '=', id)
      .execute();
    await db.deleteFrom('favorite').where('cocktail_id', '=', id).execute();
    await db.deleteFrom('rating').where('cocktail_id', '=', id).execute();
    await db.deleteFrom('recipe').where('cocktail_id', '=', id).execute();
    await db.deleteFrom('comment').where('cocktail_id', '=', id).execute();
    const deletedCocktail = await db
      .deleteFrom('cocktail')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedCocktail) {
      res.status(200).send('Cocktail deleted successfully');
    } else {
      res.status(404).send('Cocktail not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les commentaires présents en BDD
adminRouter.get('/comment', async (req, res) => {
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
adminRouter.get('/comment/:id', async (req, res) => {
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
adminRouter.delete('/comment/:id', async (req, res) => {
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

// Route get pour récupérer les verres présents en BDD
adminRouter.get('/glass', async (req, res) => {
  try {
    const glasses = await db.selectFrom('glass').selectAll().execute();
    const totalCount = glasses.length;
    res.header('Content-Range', String(totalCount));
    res.json(glasses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un verre spécifique par son ID
adminRouter.get('/glass/:id', async (req, res) => {
  try {
    const glassId = Number.parseInt(req.params.id);
    const glass = await db
      .selectFrom('glass')
      .selectAll()
      .where('id', '=', glassId)
      .executeTakeFirst();

    if (glass) {
      res.json(glass);
    } else {
      res.status(404).send('Glass not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un verre spécifique par son ID
adminRouter.put('/glass/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = glassSchema.parse(updateData) as UpdateObject<
      Database,
      'glass',
      'glass'
    >;

    const updatedGlass = await db
      .updateTable('glass')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedGlass) {
      res.json(updatedGlass);
    } else {
      res.status(404).send('Glass not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un verre spécifique par son ID
adminRouter.delete('/glass/:id', async (req, res) => {
  try {
    const glassId = Number.parseInt(req.params.id);
    const cocktailIds = await db
      .selectFrom('cocktail')
      .select('id')
      .where('glass_id', '=', glassId)
      .execute();
    for (const { id: cocktailId } of cocktailIds) {
      await db
        .deleteFrom('cocktail_topping')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('favorite')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('rating')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('recipe')
        .where('cocktail_id', '=', cocktailId)
        .execute();
      await db
        .deleteFrom('comment')
        .where('cocktail_id', '=', cocktailId)
        .execute();
    }
    await db.deleteFrom('cocktail').where('glass_id', '=', glassId).execute();
    const deletedGlass = await db
      .deleteFrom('glass')
      .where('id', '=', glassId)
      .executeTakeFirst();

    if (deletedGlass) {
      res.status(200).send('Glass deleted successfully');
    } else {
      res.status(404).send('Glass not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les ingrédients présents en BDD
adminRouter.get('/ingredient', async (req, res) => {
  try {
    const ingredients = await db.selectFrom('ingredient').selectAll().execute();
    const totalCount = ingredients.length;
    res.header('Content-Range', String(totalCount));
    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un ingrédient spécifique par son ID
adminRouter.get('/ingredient/:id', async (req, res) => {
  try {
    const ingredientId = Number.parseInt(req.params.id);
    const ingredient = await db
      .selectFrom('ingredient')
      .selectAll()
      .where('id', '=', ingredientId)
      .executeTakeFirst();

    if (ingredient) {
      res.json(ingredient);
    } else {
      res.status(404).send('Ingredient not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un ingrédient spécifique par son ID
adminRouter.put('/ingredient/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = ingredientSchema.parse(updateData) as UpdateObject<
      Database,
      'ingredient',
      'ingredient'
    >;

    const updatedIngredient = await db
      .updateTable('ingredient')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedIngredient) {
      res.json(updatedIngredient);
    } else {
      res.status(404).send('Ingredient not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un ingredient spécifique par son ID
adminRouter.delete('/ingredient/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    await db
      .deleteFrom('action_ingredient')
      .where('ingredient_id', '=', id)
      .execute();
    const deletedIngredient = await db
      .deleteFrom('ingredient')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedIngredient) {
      res.status(200).send('Ingredient deleted successfully');
    } else {
      res.status(404).send('Ingredient not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les toppings présents en BDD
adminRouter.get('/topping', async (req, res) => {
  try {
    const toppings = await db.selectFrom('topping').selectAll().execute();
    const totalCount = toppings.length;
    res.header('Content-Range', String(totalCount));
    res.json(toppings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer un topping spécifique par son ID
adminRouter.get('/topping/:id', async (req, res) => {
  try {
    const toppingId = Number.parseInt(req.params.id);
    const topping = await db
      .selectFrom('topping')
      .selectAll()
      .where('id', '=', toppingId)
      .executeTakeFirst();

    if (topping) {
      res.json(topping);
    } else {
      res.status(404).send('Topping not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route PUT pour mettre à jour un topping spécifique par son ID
adminRouter.put('/topping/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    const updateData = req.body;
    const parsedUpdateData = toppingSchema.parse(updateData) as UpdateObject<
      Database,
      'topping',
      'topping'
    >;

    const updatedTopping = await db
      .updateTable('topping')
      .set(parsedUpdateData)
      .where('id', '=', id)
      .executeTakeFirst();

    if (updatedTopping) {
      res.json(updatedTopping);
    } else {
      res.status(404).send('Topping not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route DELETE pour supprimer un topping spécifique par son ID
adminRouter.delete('/topping/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id);
    await db
      .deleteFrom('cocktail_topping')
      .where('topping_id', '=', id)
      .execute();
    const deletedTopping = await db
      .deleteFrom('topping')
      .where('id', '=', id)
      .executeTakeFirst();

    if (deletedTopping) {
      res.status(200).send('Topping deleted successfully');
    } else {
      res.status(404).send('Topping not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route get pour récupérer les utilisateurs présents en BDD
adminRouter.get('/user', async (req, res) => {
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
adminRouter.get('/user/:id', async (req, res) => {
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
adminRouter.put('/user/:id', async (req, res) => {
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
adminRouter.delete('/user/:id', async (req, res) => {
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

export { adminRouter };
