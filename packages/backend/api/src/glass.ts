import express from 'express';
import { sql } from 'kysely';

import { db } from '@app/backend-shared';

const glass = express.Router();

glass.get('/', async (req, res) => {
  const glass = await db
    .selectFrom('glass')
    .select(['glass.id', 'glass.name', 'capacity'])
    .orderBy(sql`rand()`)
    .limit(1)
    .execute();

  return res.json(glass[0]);
});

export { glass };
