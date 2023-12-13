import { type Kysely, sql } from 'kysely';

import type { Database, Ingredient } from '@app/types';

async function getRandomToppings(db: Kysely<Database>): Promise<Ingredient[]> {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT * FROM topping ORDER BY RAND() LIMIT 4;
    `.execute(trx);
    return result.rows as Ingredient[];
  });
}

export { getRandomToppings };
