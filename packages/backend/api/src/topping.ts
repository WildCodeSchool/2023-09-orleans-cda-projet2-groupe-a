import express from 'express';

import type { Flavour } from '@app/types';

import { getToppingsByFlavour } from './services/topping-service';

const topping = express.Router();

topping.get('/:mainFlavour', async (req, res) => {
  const mainFlavour: Flavour = req.params.mainFlavour as Flavour;
  try {
    const result = await getToppingsByFlavour(mainFlavour);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { topping };
