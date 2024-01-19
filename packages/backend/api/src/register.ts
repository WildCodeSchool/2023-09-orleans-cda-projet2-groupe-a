import express from 'express';

import { db } from '@app/backend-shared';

const register = express.Router();

register.post('/register', async (req, res) => {
  try {
    const categories = await db.selectFrom('criteria').selectAll().execute();
    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving data ${String(error)}`,
    });
  }
});

export { register };
