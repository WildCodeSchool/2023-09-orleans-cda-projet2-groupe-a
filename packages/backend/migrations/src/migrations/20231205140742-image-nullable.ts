// file format is YYYYMMDDHHMM-<name>.ts
import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE cocktail
      MODIFY image VARCHAR(255) NULL;
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE cocktail
      MODIFY image VARCHAR(255) NOT NULL;
    `.execute(trx);
  });
}
