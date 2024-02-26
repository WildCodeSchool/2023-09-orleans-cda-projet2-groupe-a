import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE ingredient
      MODIFY family ENUM('water', 'alcohol', 'juice', 'soda', 'syrup', 'bitter', 'fruit', 'vegetable', 'herb', 'spice', 'sauce', 'milk', 'cream', 'condiment', 'meat', 'seafood', 'other', 'softdrink') NOT NULL;
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE ingredient
      MODIFY family ENUM('water', 'alcohol', 'juice', 'soda', 'syrup', 'bitter', 'fruit', 'vegetable', 'herb', 'spice', 'sauce', 'milk', 'cream', 'condiment', 'meat', 'seafood', 'other') NOT NULL;
    `.execute(trx);
  });
}
