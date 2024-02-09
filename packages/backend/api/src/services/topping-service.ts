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
    const toppings = result.rows as Topping[];
    if (toppings.length < 4) {
      const neededRandomToppings = 4 - toppings.length;
      const randomToppingsResult = await getRandomTopping(neededRandomToppings);
      toppings.push(...randomToppingsResult);
    }
    return toppings;
  });
}

export { getRandomTopping, getToppingsByFlavour };
