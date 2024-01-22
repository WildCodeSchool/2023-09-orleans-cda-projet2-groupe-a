import { sql } from 'kysely';

import { db } from '@app/backend-shared';
import type { Flavour, Topping } from '@app/types';

async function getRandomTopping(limit: number): Promise<Topping[]> {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT * FROM topping ORDER BY RAND() LIMIT ${limit};
    `.execute(trx);
    return result.rows as Topping[];
  });
}

async function getToppingsByFlavour(mainFlavour: Flavour): Promise<Topping[]> {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT * FROM topping WHERE flavour = ${mainFlavour} LIMIT 4;
    `.execute(trx);
    return result.rows as Topping[];
  });
}

export { getRandomTopping, getToppingsByFlavour };
