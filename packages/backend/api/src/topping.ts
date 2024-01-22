import express from 'express';

import type { Flavour } from '@app/types';

import {
  getRandomTopping,
  getToppingsByFlavour,
} from './services/topping-service';

const topping = express.Router();

topping.get('/random/:limit', async (req, res) => {
  const limit = Number.parseInt(req.params.limit);
  try {
    const result = await getRandomTopping(limit);
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

topping.get('/:mainFlavour', async (req, res) => {
  const numberOfToppingsWanted = 4;
  const mainFlavour: Flavour = req.params.mainFlavour as Flavour;
  try {
    const result = await getToppingsByFlavour(mainFlavour);
    if (result.length < numberOfToppingsWanted) {
      const randomToppings = await getRandomTopping(
        numberOfToppingsWanted - result.length,
      );
      result.push(...randomToppings);
    }
    res.json(result);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { topping };
