import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.

  await sql`
    INSERT INTO glass (name, capacity, image, material)
    VALUES 
      ('Whiskey Glass', 10, 'whiskey_glass.jpg', 'glass'),
      ('Martini Glass', 8, 'martini_glass.jpg', 'glass'),
      ('Mug', 12, 'mug.jpg', 'metal');
  `.execute(db);

  await sql`
    INSERT INTO ingredient (name, color, kcal, degree, description, image, flavour, family)
    VALUES 
      ('Lemon', 'Yellow', 20, 0, 'Citrus flavor', 'lemon.jpg', 'fruity', 'fruit'),
      ('Mint', 'Green', 5, 0, 'Fresh and aromatic', 'mint.jpg', 'herbaceous', 'herb'),
      ('Vodka', 'Clear', 60, 40, 'Neutral spirit', 'vodka.jpg', 'neutral', 'alcohol');
  `.execute(db);

  await sql`
    INSERT INTO cocktail (name, image, total_kcal, total_degree, ratings_average, glass_id, final_flavour, created_at, total_quantity)
    VALUES 
      ('Whiskey Sour', 'whiskey_sour.jpg', 150, 15, '4.5', 1, 'fruity', NOW(), 1),
      ('Mojito', 'mojito.jpg', 100, 10, '4.5', 2, 'sweet', NOW(), 1),
      ('Vodka Soda', 'vodka_soda.jpg', 70, 5, '3.5', 3, 'neutral', NOW(), 1);
  `.execute(db);

  await sql`
    INSERT INTO topping (name)
    VALUES 
      ('Lemon Twist'),
      ('Mint Sprig'),
      ('Cherry');
  `.execute(db);

  await sql`
    INSERT INTO tool (name, image)
    VALUES 
      ('Muddler', 'muddler.jpg'),
      ('Shaker', 'shaker.jpg'),
      ('Strainer', 'strainer.jpg');
  `.execute(db);

  await sql`
    INSERT INTO action (verb, priority, tool_id, duration, complexity, is_mandatory)
    VALUES 
      ('muddle', 1, 1, 10, 2, true),
      ('shake', 2, 2, 15, 3, true),
      ('strain', 3, 3, 5, 1, true);
  `.execute(db);

  await sql`
    INSERT INTO action_ingredient (ingredient_id, action_id, quantity)
    VALUES 
      (1, 1, 1),
      (2, 2, 2),
      (3, 3, 1);
  `.execute(db);

  await sql`
    INSERT INTO cocktail_topping (cocktail_id, topping_id, quantity)
    VALUES 
      (1, 1, 1),
      (2, 2, 2),
      (3, 3, 1);
  `.execute(db);

  await sql`
    INSERT INTO recipe (cocktail_id, action_id, total_complexity, total_duration, step)
    VALUES 
      (1, 1, 2, 10, 1),
      (1, 2, 5, 15, 2),
      (1, 3, 1, 5, 3);
  `.execute(db);
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database back to the state it was in before up was run.

  await sql`DELETE FROM recipe`.execute(db);
  await sql`DELETE FROM cocktail_topping`.execute(db);
  await sql`DELETE FROM action_ingredient`.execute(db);
  await sql`DELETE FROM action`.execute(db);
  await sql`DELETE FROM tool`.execute(db);
  await sql`DELETE FROM topping`.execute(db);
  await sql`DELETE FROM cocktail`.execute(db);
  await sql`DELETE FROM ingredient`.execute(db);
  await sql`DELETE FROM glass`.execute(db);
}
