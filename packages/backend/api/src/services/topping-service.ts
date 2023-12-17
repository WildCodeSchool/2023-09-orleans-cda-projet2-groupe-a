import { type Kysely, sql } from 'kysely';

import type { Database, Flavour, Ingredient, Topping } from '@app/types';

async function getRandomToppings(db: Kysely<Database>): Promise<Ingredient[]> {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT * FROM topping ORDER BY RAND() LIMIT 4;
    `.execute(trx);
    return result.rows as Ingredient[];
  });
}

async function getToppingsByFlavour(
  db: Kysely<Database>,
  mainFlavour: Flavour,
): Promise<Topping[]> {
  return db.transaction().execute(async (trx) => {
    const result = await sql`
      SELECT * FROM topping WHERE flavour = ${mainFlavour} LIMIT 4;
    `.execute(trx);
    return result.rows as Topping[];
  });
}

export { getRandomToppings, getToppingsByFlavour };
