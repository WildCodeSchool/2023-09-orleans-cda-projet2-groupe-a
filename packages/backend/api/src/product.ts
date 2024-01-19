import express from 'express';

import { db } from '@app/backend-shared';

import loginIdUser from './middlewares/login-id-user';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number;
  }
}

const productRouter = express.Router();

productRouter.get('/vieux', (req, res) => {
  const products = [
    {
      name: 'Sérum Anti-Âge Régénérant',
      brand: "L'Oréal Paris",
      category: 'vieux',
      image: 'serum-anti-age.jpg',
      price: 29.99,
    },
    {
      name: 'Crème Contour des Yeux Anti-Cernes',
      brand: "L'Oréal Paris",
      category: 'vieux',
      image: 'creme-contour-yeux.jpg',
      price: 19.99,
    },
    {
      name: 'Masque Nourrissant Anti-Rides',
      brand: "L'Oréal Paris",
      category: 'vieux',
      image: 'masque-anti-rides.jpg',
      price: 24.99,
    },
    {
      name: 'Correcteur de Rides Intensif',
      brand: "L'Oréal Paris",
      category: 'vieux',
      image: 'correcteur-rides.jpg',
      price: 34.99,
    },
    {
      name: 'Gel Anti-Fatigue Yeux',
      brand: "L'Oréal Paris",
      category: 'vieux',
      image: 'gel-anti-fatigue.jpg',
      price: 15.99,
    },
    {
      name: 'Soin Hydratant Nuit Anti-Âge',
      brand: "L'Oréal Paris",
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
      brand: "L'Oréal Paris",
      category: 'soin peau',
      image: 'lotion-tonique-hydratante.jpg',
      price: 19.99,
    },
    {
      name: 'Savon Liquide Hydratant',
      brand: "L'Oréal Paris",
      category: 'hygiène corporelle',
      image: 'savon-liquide-hydratant.jpg',
      price: 12.99,
    },
    {
      name: 'Crème Hydratante Visage et Corps',
      brand: "L'Oréal Paris",
      category: 'soin peau',
      image: 'creme-hydratante-visage-et-corps.jpg',
      price: 14.99,
    },
    {
      name: 'Lait Hydratant Corps',
      brand: "L'Oréal Paris",
      category: 'soin corps',
      image: 'lait-hydratant-corps.jpg',
      price: 13.99,
    },
    {
      name: 'Huile Nourrissante pour le Corps',
      brand: "L'Oréal Paris",
      category: 'soin corps',
      image: 'huile-nourrissante-corps.jpg',
      price: 12.99,
    },
    {
      name: 'Crème Hydratante Corps',
      brand: "L'Oréal Paris",
      category: 'soin corps',
      image: 'creme-hydratante-corps.jpg',
      price: 29.99,
    },
  ];
  res.json({ products: products });
});

productRouter.get('/soleil', (req, res) => {
  const products = [
    {
      name: 'Crème Solaire SPF 50+',
      brand: "L'Oréal Paris",
      category: 'soleil',
      image: 'creme-solaire-spf50.jpg',
      price: 24.99,
    },
    {
      name: 'Huile Bronzante',
      brand: "L'Oréal Paris",
      category: 'soleil',
      image: 'huile-bronzante.jpg',
      price: 18.99,
    },
    {
      name: 'Après-Soleil Hydratant',
      brand: "L'Oréal Paris",
      category: 'soleil',
      image: 'apres-soleil-hydratant.jpg',
      price: 14.99,
    },
    {
      name: 'Spray Rafraîchissant Après-Soleil',
      brand: "L'Oréal Paris",
      category: 'soleil',
      image: 'spray-apres-soleil.jpg',
      price: 9.99,
    },
    {
      name: 'Lotion Autobronzante',
      brand: "L'Oréal Paris",
      category: 'soleil',
      image: 'lotion-autobronzante.jpg',
      price: 21.99,
    },
    {
      name: 'Chapeau de Soleil Anti-UV',
      brand: "L'Oréal Paris",
      category: 'accessoire',
      image: 'chapeau-soleil.jpg',
      price: 15.99,
    },
  ];
  res.json({ products: products });
});

productRouter.get('/', async (req, res) => {
  try {
    const products = await db.selectFrom('product').selectAll().execute();
    res.json({ products });
  } catch {
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
  } catch {
    res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/email', async (req, res) => {
  try {
    const products = await db
      .selectFrom('consumer')
      .selectAll()
      .where('consumer.email', 'in', [
        'gertrude@gmail.com',
        'carol@gmail.com',
        'laura@gmail.com',
      ])
      .execute();

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export { productRouter };
