import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const glass = express.Router();

glass.get('/glass', async (req, res) => {
  const glass = await db
    .selectFrom('glass')
    .select(['glass.id', 'glass.name'])
    .orderBy(sql`rand()`)
    .limit(1)
    .execute();

  return res.json(glass);
});

export { glass };
