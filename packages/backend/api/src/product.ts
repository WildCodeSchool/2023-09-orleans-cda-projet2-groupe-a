import express from 'express';

import { db } from '@app/backend-shared';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await db.selectFrom('product').selectAll().execute();
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const products = await db
      .selectFrom('product')
      .selectAll()
      .where('product.id', '=', Number.parseInt(id))
      .execute();

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { productRouter };
