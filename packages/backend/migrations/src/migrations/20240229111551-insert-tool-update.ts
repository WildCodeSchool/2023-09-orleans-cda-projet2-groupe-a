import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      UPDATE tool SET name = 'spoon.png' WHERE name = 'spoon.jpg';
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      UPDATE tool SET name = 'spoon.jpg' WHERE name = 'spoon.png';
    `.execute(trx);
  });
}
