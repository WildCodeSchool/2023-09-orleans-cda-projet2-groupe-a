// file format is YYYYMMDDHHMM-<name>.ts
import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .modifyColumn('password', 'varchar(60)', (col) => col.notNull())
      .modifyColumn('created_at', 'datetime', (col) =>
        col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
      )
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .modifyColumn('password', 'varchar(255)', (col) => col.notNull())
      .modifyColumn('created_at', 'datetime', (col) => col.notNull())
      .execute();
  });
}
