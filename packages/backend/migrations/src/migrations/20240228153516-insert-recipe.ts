import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO recipe (cocktail_id, action_id, total_complexity, total_duration, step)
      VALUES
      (1, 1, 3, 45, 2),
      (1, 6, 3, 55, 3),
      (1, 11, 2, 80, 1),
      (2, 2, 2, 80, 3),
      (2, 8, 3, 90, 1),
      (2, 14, 2, 75, 2),
      (3, 3, 3, 15, 1),
      (3, 5, 2, 25, 2),
      (3, 12, 3, 30, 3),
      (4, 4, 2, 35, 2),
      (4, 9, 3, 40, 1),
      (4, 13, 2, 60, 3),
      (5, 5, 3, 65, 1),
      (5, 7, 2, 55, 3),
      (5, 10, 3, 70, 2),
      (6, 6, 2, 50, 3),
      (6, 2, 3, 40, 1),
      (6, 4, 2, 65, 2),
      (7, 7, 3, 95, 2),
      (7, 13, 2, 85, 1),
      (7, 9, 3, 75, 3),
      (8, 8, 2, 20, 1),
      (8, 11, 3, 25, 2),
      (8, 1, 2, 15, 3),
      (9, 9, 3, 70, 2),
      (9, 14, 2, 80, 1),
      (9, 3, 3, 60, 3),
      (10, 10, 2, 110, 3),
      (10, 4, 3, 100, 1),
      (10, 12, 2, 90, 2),
      (11, 11, 3, 45, 1),
      (11, 6, 2, 55, 3),
      (11, 2, 3, 70, 2),
      (12, 12, 2, 80, 2),
      (12, 9, 3, 90, 1),
      (12, 8, 2, 75, 3),
      (13, 13, 3, 15, 3),
      (13, 3, 2, 25, 1),
      (13, 5, 3, 30, 2),
      (14, 14, 2, 35, 1),
      (14, 10, 3, 40, 2),
      (14, 1, 2, 60, 3),
      (15, 11, 3, 65, 2),
      (15, 2, 2, 55, 1),
      (15, 7, 3, 70, 3),
      (16, 12, 2, 50, 1),
      (16, 4, 3, 40, 2),
      (16, 11, 2, 65, 3),
      (17, 12, 3, 95, 3),
      (17, 14, 2, 85, 1),
      (17, 6, 3, 75, 2),
      (18, 1, 2, 20, 1),
      (18, 5, 3, 25, 2),
      (18, 12, 2, 15, 3),
      (19, 9, 3, 70, 2),
      (19, 8, 2, 80, 1),
      (19, 13, 3, 60, 3),
      (20, 2, 2, 110, 3),
      (20, 11, 3, 100, 1),
      (20, 3, 2, 90, 2),
      (21, 1, 3, 45, 1),
      (21, 13, 2, 55, 3),
      (21, 5, 3, 70, 2),
      (22, 2, 2, 80, 2),
      (22, 9, 3, 90, 1),
      (22, 1, 2, 75, 3),
      (23, 3, 3, 15, 3),
      (23, 3, 2, 25, 1),
      (23, 11, 3, 30, 2),
      (24, 4, 2, 35, 1),
      (24, 10, 3, 40, 2),
      (24, 12, 2, 60, 3),
      (25, 8, 3, 65, 2),
      (25, 6, 2, 55, 1),
      (25, 2, 3, 70, 3),
      (26, 6, 2, 50, 1),
      (26, 14, 3, 40, 2),
      (26, 8, 2, 65, 3),
      (27, 7, 3, 95, 3),
      (27, 3, 2, 85, 1),
      (27, 9, 3, 75, 2),
      (28, 8, 2, 20, 1),
      (28, 5, 3, 25, 2),
      (28, 13, 2, 15, 3),
      (29, 9, 3, 70, 2),
      (29, 8, 2, 80, 1),
      (29, 11, 3, 60, 3),
      (30, 3, 2, 110, 3),
      (30, 11, 3, 100, 1),
      (30, 9, 2, 90, 2),
      (31, 1, 3, 45, 1),
      (31, 6, 2, 55, 3),
      (31, 2, 3, 70, 2),
      (32, 3, 2, 80, 2),
      (32, 9, 3, 90, 1),
      (32, 14, 2, 75, 3),
      (33, 11, 3, 15, 3),
      (33, 3, 2, 25, 1),
      (33, 5, 3, 30, 2),
      (34, 4, 2, 35, 1),
      (34, 10, 3, 40, 2),
      (34, 1, 2, 60, 3),
      (35, 5, 3, 65, 2),
      (35, 2, 2, 55, 1),
      (35, 7, 3, 70, 3),
      (36, 6, 2, 50, 1),
      (36, 4, 3, 40, 2),
      (36, 11, 2, 65, 3);
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE recipe;
    `.execute(trx);
  });
}