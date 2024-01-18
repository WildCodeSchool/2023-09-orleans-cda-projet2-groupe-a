/* eslint-disable @typescript-eslint/require-await */
import express from 'express';

//import { db } from '@app/backend-shared';
import authRouter from './auth/auth';
import { criteriaRouter } from './criteria/criteria-crud';
import multerConfig from './middlewares/multer-config';
//import type { SomeInterface } from '@app/types';
import { productRouter } from './product';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/criteria', criteriaRouter);

// router.get('/', async (_request, response) => {
//   // you can remove this; it's just for the demo
//   const result = await sql<{
//     coucou: number;
//   }>`SELECT 1 as coucou`.execute(db);
//   const [row] = result.rows;

//   return response.send(`Hello World! ${row.coucou}`);
// });

// router.get('/some-route', (_request, response) => {
//   const value: SomeInterface = {
//     someProperty: 'someValueFromApi',
//   };

//   return response.json(value);
// });

router.use('/product', productRouter);
// Route post pour uploader un fichier
router.post('/upload', multerConfig, async (req, res) => {
  try {
    // Normalement, on gère ici l'insertion en BDD mais ici on se contente d'appeler multerConfig sur la route pour l'insertion dans uploads.
    res.send('Fichier uploadé avec succès!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
