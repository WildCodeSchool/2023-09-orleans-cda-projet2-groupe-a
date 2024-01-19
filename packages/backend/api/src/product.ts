import express from 'express';

import { db } from '@app/backend-shared';

const productRouter = express.Router();

productRouter.get('/vieux', (req, res) => {
  const products = [
    {
      name: 'Sérum Anti-Âge Régénérant',
      brand: 'Ageless Renew',
      category: 'vieux',
      image: 'serum-anti-age.jpg',
      price: 29.99,
    },
    {
      name: 'Crème Contour des Yeux Anti-Cernes',
      brand: 'BrightEyes',
      category: 'vieux',
      image: 'creme-contour-yeux.jpg',
      price: 19.99,
    },
    {
      name: 'Masque Nourrissant Anti-Rides',
      brand: 'Youthful Mask',
      category: 'vieux',
      image: 'masque-anti-rides.jpg',
      price: 24.99,
    },
    {
      name: 'Correcteur de Rides Intensif',
      brand: 'WrinkleFixer',
      category: 'vieux',
      image: 'correcteur-rides.jpg',
      price: 34.99,
    },
    {
      name: 'Gel Anti-Fatigue Yeux',
      brand: 'RevitalEye',
      category: 'vieux',
      image: 'gel-anti-fatigue.jpg',
      price: 15.99,
    },
    {
      name: 'Soin Hydratant Nuit Anti-Âge',
      brand: 'NightReplenish',
      category: 'vieux',
      image: 'soin-hydratant-nuit.jpg',
      price: 27.99,
    },
  ];
  res.json({ products: products });
});

productRouter.get('/sec', (req, res) => {
  const products = [
    {
      name: 'Lotion Tonique Hydratante',
      brand: 'Hydra Genius',
      category: 'soin peau',
      image: 'lotion-tonique-hydratante.jpg',
      price: 19.99,
    },
    {
      name: 'Savon Liquide Hydratant',
      brand: 'Nutra-Glow',
      category: 'hygiène corporelle',
      image: 'savon-liquide-hydratant.jpg',
      price: 12.99,
    },
    {
      name: 'Crème Hydratante Visage et Corps',
      brand: 'Nutra-Glow',
      category: 'soin peau',
      image: 'creme-hydratante-visage-et-corps.jpg',
      price: 14.99,
    },
    {
      name: 'Lait Hydratant Corps',
      brand: 'Hydra Genius',
      category: 'soin corps',
      image: 'lait-hydratant-corps.jpg',
      price: 13.99,
    },
    {
      name: 'Huile Nourrissante pour le Corps',
      brand: 'Nutra-Glow',
      category: 'soin corps',
      image: 'huile-nourrissante-corps.jpg',
      price: 12.99,
    },
    {
      name: 'Crème Hydratante Corps',
      brand: 'Hydra Genius',
      category: 'soin corps',
      image: 'creme-hydratante-corps.jpg',
      price: 29.99,
    },
  ];
  res.json({ products: products });
});

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
