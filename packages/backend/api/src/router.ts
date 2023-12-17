import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { Flavour, SomeInterface } from '@app/types';

import { authRouter } from './auth';
import { cocktailRouter } from './cocktail';
import { ingredient } from './ingredient';
import { getAlcoholsByDegree } from './services/alcohol-service';
import { getToppingsByFlavour } from './services/topping-service';

const router = express.Router();

router.use('/cocktail', cocktailRouter);

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

router.get('/toppings/:mainFlavour', async (req, res) => {
  const mainFlavour: Flavour = req.params.mainFlavour as Flavour;
  try {
    const result = await getToppingsByFlavour(db, mainFlavour);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.use('/auth', authRouter);
router.use('/ingredient', ingredient);

export default router;
