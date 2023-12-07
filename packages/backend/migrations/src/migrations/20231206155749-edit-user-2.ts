// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .modifyColumn('image', 'varchar(255)')
      .execute();
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await trx.schema
      .alterTable('user')
      .modifyColumn('image', 'varchar(255)', (col) => col.notNull())
      .execute();
  });
}
