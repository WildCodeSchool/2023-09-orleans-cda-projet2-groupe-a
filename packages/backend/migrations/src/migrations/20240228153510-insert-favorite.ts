import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO favorite (user_id, cocktail_id)
      VALUES
      (1, 1),
      (1, 2),
      (1, 3),
      (1, 4),
      (1, 5),
      (1, 6),
      (1, 7),
      (1, 8),
      (1, 9),
      (1, 10),
      (1, 11),
      (1, 12),
      (1, 13),
      (1, 14),
      (1, 15),
      (1, 16),
      (2, 2),
      (3, 3);
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE favorite;
    `.execute(trx);
  });
}
