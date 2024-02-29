import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO user (email, password, pseudo, image, color, birthdate, created_at)
      VALUES
      ('admin@example.com', 'adminpassword', 'admin', 'avatar-1.webp', 'blue', '1990-01-01', NOW()),
      ('user1@example.com', 'userpassword', 'user1', 'avatar-2.webp', 'green', '1991-02-02', NOW()),
      ('user2@example.com', 'userpassword', 'user2', 'avatar-3.webp', 'orange', '1992-03-03', NOW()),
      ('user3@example.com', 'userpassword', 'user3', 'avatar-4.webp', 'pink', '1993-04-04', NOW()),
      ('user4@example.com', 'userpassword', 'user4', 'avatar-5.webp', 'purple', '1994-05-05', NOW()),
      ('user5@example.com', 'userpassword', 'user5', 'avatar-6.webp', 'purple', '1994-05-05', NOW()),
      ('user6@example.com', 'userpassword', 'user6', 'avatar-7.webp', 'purple', '1994-05-05', NOW()),
      ('user7@example.com', 'userpassword', 'user7', 'avatar-8.webp', 'purple', '1994-05-05', NOW());
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE user;
    `.execute(trx);
  });
}
