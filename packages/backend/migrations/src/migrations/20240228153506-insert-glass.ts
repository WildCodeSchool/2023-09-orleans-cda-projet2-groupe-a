import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO glass(name, capacity, image, material)
      VALUES
      ('Cocktail Glass', 150, 'cocktail-glass.jpg', 'glass'),
      ('Old Fashioned Glass', 200, 'old-fashioned-glass.jpg', 'glass'),
      ('Wine Glass', 400, 'wine-glass.jpg', 'glass'),
      ('Champagne Flute', 150, 'champagne.jpg', 'glass'),
      ('Tumbler', 350, 'tumbler.jpg', 'glass'),
      ('Shot Glass', 50, 'shot.jpg', 'glass'),
      ('Pint Glass', 500, 'pint.jpg', 'glass');
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE glass;
    `.execute(trx);
  });
}
