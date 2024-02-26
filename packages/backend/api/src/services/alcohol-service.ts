import { type Kysely, sql } from 'kysely';

import type { Database, Ingredient } from '@app/types';

async function getAlcoholsByDegree(
  db: Kysely<Database>,
  degree: number,
): Promise<Ingredient[]> {
  return db.transaction().execute(async (trx) => {
    let addSql;

    if (degree === 1) {
      addSql = '<= 15';
    } else if (degree === 2) {
      addSql = 'BETWEEN 15 AND 39';
    } else {
      addSql = '>= 40';
    }

    const result = await sql`
      SELECT * FROM ingredient WHERE family = 'alcohol' AND degree ${sql.raw(
        addSql,
      )} LIMIT 5;
    `.execute(trx);

    return result.rows as Ingredient[];
  });
}

export { getAlcoholsByDegree };
