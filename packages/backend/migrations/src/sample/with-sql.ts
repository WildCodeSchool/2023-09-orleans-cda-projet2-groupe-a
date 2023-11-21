import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await sql`
    CREATE TABLE item (
      id int8 AUTO_INCREMENT PRIMARY KEY,
      content text NOT NULL
    );
  `.execute(db);
  await sql`
    DROP TABLE item;
  `.execute(db);
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await sql`
    DROP TABLE item IF EXISTS;
  `.execute(db);
}
