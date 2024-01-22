import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { SomeInterface } from '@app/types';

import { authRouter } from './auth';
import { cocktailRouter } from './cocktail';
import { commentRouter } from './comment';
import { filterRouter } from './filter';
import { glass } from './glass';
import { ingredient } from './ingredient';
import { getAlcoholsByDegree } from './services/alcohol-service';
import { topping } from './topping';
import { user } from './user';

const router = express.Router();

router.get('/', async (_request, response) => {
  const result = await sql<{
    coucou: number;
  }>`SELECT 1 as coucou`.execute(db);
  const [row] = result.rows;

  return response.send(`Hello World! ${row.coucou}`);
});

router.get('/some-route', (_request, response) => {
  const value: SomeInterface = {
    someProperty: 'someValueFromApi',
  };

  return response.json(value);
});

router.get('/alcohols/:level', async (req, res) => {
  const degree = Number.parseInt(req.params.level);

  try {
    const result = await getAlcoholsByDegree(db, degree);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.use('/auth', authRouter);
router.use('/user', user);
router.use('/ingredient', ingredient);
router.use('/cocktail', cocktailRouter);
router.use('/comment', commentRouter);
router.use('/glass', glass);
router.use('/filter', filterRouter);
router.use('/topping', topping);

export default router;
