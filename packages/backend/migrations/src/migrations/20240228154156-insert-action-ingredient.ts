import { sql } from 'kysely';

import { db } from '@app/backend-shared';

await db.transaction().execute(async (trx) => {
  await sql`
    INSERT INTO action_ingredient (ingredient_id, action_id, quantity)
    VALUES
    (1, 1, 2),
    (2, 3, 4),
    (3, 5, 1),
    (4, 7, 3),
    (5, 9, 2),
    (6, 11, 5),
    (7, 13, 3),
    (8, 14, 1),
    (9, 1, 4),
    (10, 3, 2),
    (11, 5, 3),
    (12, 7, 1),
    (13, 7, 4),
    (14, 7, 2),
    (13, 8, 3),
    (12, 5, 5),
    (11, 8, 2),
    (10, 9, 1),
    (9, 9, 4),
    (8, 11, 3);
  `.execute(trx);
});
