import { sql } from 'kysely';

import { db } from '@app/backend-shared';

await db.transaction().execute(async (trx) => {
  await sql`
    INSERT INTO favorite (user_id, cocktail_id)
    VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (2, 2),
    (3, 3);
  `.execute(trx);
});
