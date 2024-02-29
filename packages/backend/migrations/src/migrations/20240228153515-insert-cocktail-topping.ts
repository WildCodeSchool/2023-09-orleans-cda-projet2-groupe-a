import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO cocktail_topping (cocktail_id, topping_id, quantity)
      VALUES
      (24, 7, 2),
      (12, 1, 3),
      (33, 6, 1),
      (18, 2, 4),
      (29, 8, 2),
      (8, 4, 3),
      (21, 1, 2),
      (7, 8, 1),
      (14, 6, 4),
      (30, 4, 3),
      (5, 1, 2),
      (36, 4, 1),
      (19, 5, 3),
      (26, 3, 2),
      (9, 8, 1),
      (32, 6, 4),
      (15, 7, 2),
      (22, 3, 1),
      (2, 2, 4),
      (28, 1, 2),
      (11, 4, 1),
      (25, 4, 3),
      (13, 6, 2),
      (34, 8, 1),
      (17, 5, 3),
      (31, 7, 2),
      (6, 3, 1),
      (23, 1, 4),
      (10, 8, 3),
      (35, 8, 2),
      (20, 4, 1),
      (27, 6, 4),
      (4, 8, 2),
      (16, 5, 1),
      (1, 3, 3),
      (3, 2, 2);
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE cocktail_topping;
    `.execute(trx);
  });
}
