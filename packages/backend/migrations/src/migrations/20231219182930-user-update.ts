// file format is YYYYMMDDHHMM-<name>.ts
import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE user
      ADD color ENUM('blue', 'pink', 'orange', 'red', 'green', 'yellow', 'purple') NULL;
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE user
      DROP COLUMN color;
    `.execute(trx);
  });
}
