import express from 'express';

import type { Flavour } from '@app/types';

import {
  getRandomTopping,
  getToppingsByFlavour,
} from './services/topping-service';

const topping = express.Router();

topping.get('/random', async (req, res) => {
  try {
    const result = await getRandomTopping();
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

topping.get('/:mainFlavour', async (req, res) => {
  const mainFlavour: Flavour = req.params.mainFlavour as Flavour;
  try {
    const result = await getToppingsByFlavour(mainFlavour);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { topping };
