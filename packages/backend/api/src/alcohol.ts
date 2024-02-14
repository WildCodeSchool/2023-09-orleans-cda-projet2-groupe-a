import express from 'express';

import { db } from '@app/backend-shared';

import { getAlcoholsByDegree } from './services/alcohol-service';

const alcoholRouter = express.Router();

alcoholRouter.get('/:level', async (req, res) => {
  const degree = Number.parseInt(req.params.level);

  try {
    const result = await getAlcoholsByDegree(db, degree);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { alcoholRouter };
