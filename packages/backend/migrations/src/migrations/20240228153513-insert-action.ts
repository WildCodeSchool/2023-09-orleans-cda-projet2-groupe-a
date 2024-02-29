import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO action (verb, priority, tool_id, duration, complexity, is_mandatory)
      VALUES
      ('muddle', 1, 1, 30, 3, true),
      ('stir', 2, 2 , 20, 2, false),
      ('shake', 3, 3, 15, 2, false),
      ('strain', 4, 4, 25, 3, true),
      ('build', 5, 5, 20, 2, true),
      ('mix', 6, 6, 15, 2, true),
      ('pour', 7, 7, 10, 1, true),
      ('garnish', 8, 8, 5, 1, false),
      ('twist', 9, 8, 15, 2, false),
      ('spritz', 10, 6, 12, 2, false),
      ('layer', 11, 4, 8, 2, false),
      ('float', 12, 3, 30, 3, true),
      ('rim', 13, 1, 5, 2, false),
      ('ignite', 14, 4, 10, 2, false);
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE action;
    `.execute(trx);
  });
}
