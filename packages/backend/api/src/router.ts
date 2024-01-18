/* eslint-disable @typescript-eslint/require-await */
import express from 'express';

import { db } from '@app/backend-shared';

import authRouter from './auth/auth';
import { criteriaRouter } from './criteria/criteria-crud';
import multerConfig from './middlewares/multer-config';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/criteria', criteriaRouter);

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
