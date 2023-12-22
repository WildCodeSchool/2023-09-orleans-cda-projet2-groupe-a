import { type Kysely, sql } from 'kysely';

import type { Cocktail, Database, Ingredient } from '@app/types';

async function getVirginCocktails(
  db: Kysely<Database>,
  total_degree: number,
): Promise<Cocktail[]> {
  return db.transaction().execute(async (trx) => {
    let addSql;

    if (total_degree === 0) {
      addSql = '= 0';
    }

    const result = await sql`
      SELECT * FROM ingredient WHERE family = 'alcohol' AND degree ${sql.raw(
        addSql,
      )} LIMIT 5;
    `.execute(trx);

    return result.rows as Ingredient[];
  });
}

export { getVirginCocktails };
