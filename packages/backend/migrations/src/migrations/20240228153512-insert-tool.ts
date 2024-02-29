import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO tool (name, image)
      VALUES
      ('Shaker', 'shaker.png'),
      ('Knife', 'knife.png'),
      ('Spoon', 'spoon.jpg'),
      ('Muddler', 'muddler.png'),
      ('Bar Spoon', 'bar-spoon.png'),
      ('Jigger', 'jigger.png'),
      ('Strainer', 'strainer.png'),
      ('Citrus Juicer', 'citrus-juicer.png'),
      ('Blender', 'blender.png'),
      ('Ice Pick', 'ice-pick.png'),
      ('Stirring Glass', 'stirring-glass.png');
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE tool;
    `.execute(trx);
  });
}
