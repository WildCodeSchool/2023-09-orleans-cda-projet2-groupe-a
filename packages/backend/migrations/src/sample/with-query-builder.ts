// file format is YYYYMMDDHHMM-<name>.ts
import type { Kysely } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.schema
    .createTable('item')
    .addColumn('id', 'int8', (col) => col.autoIncrement().primaryKey())
    .addColumn('content', 'text', (col) => col.notNull())
    .execute();
  await db.schema.dropTable('item').execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.schema.dropTable('item').ifExists().execute();
}
