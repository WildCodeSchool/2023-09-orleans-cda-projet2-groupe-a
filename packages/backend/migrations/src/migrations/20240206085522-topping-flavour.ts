import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE topping
      DROP COLUMN flavour;
    `.execute(trx);

    await sql`
      ALTER TABLE topping
      ADD COLUMN flavour ENUM('fruity', 'spicy', 'earthy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'peppery', 'mixed', 'fresh', 'acidulous', 'sour', 'neutral', 'umami', 'astringent', 'other') NOT NULL
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE topping
      DROP COLUMN flavour;
    `.execute(trx);

    await sql`
      ALTER TABLE topping
      ADD COLUMN flavour ENUM('fruity', 'spicy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'sour', 'neutral') NOT NULL
    `.execute(trx);
  });
}
