import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      INSERT INTO cocktail (name, total_kcal, total_degree, author, ratings_average, glass_id, final_flavour, created_at, total_quantity)
      VALUES
      ('Almond Joy', 145, 0, 1, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('Aperol Spritz', 160, 8, 1, 4, 1, 'floral', NOW(), 1),
      ('Aviation', 140, 14, 1, 4, 1, 'floral', NOW(), 1),
      ('Banana Bliss', 150, 0, 2, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('Bellini', 140, 10, 1, 4.5, 1, 'neutral', NOW(), 1),
      ('Bloody Mary', 140, 15, 1, 4, 1, 'sour', NOW(), 1),
      ('Bora Bora', 140, 0, 1, 4, 1, 'fruity', NOW(), 1),
      ('Boulevardier', 200, 20, 1, 5, 1, 'bitter', NOW(), 1),
      ('Caipirinha', 160, 14, 1, 4.5, 1, 'fruity', NOW(), 1),
      ('Casino', 160, 14, 1, 4, 1, 'sweet', NOW(), 1),
      ('Cherry Cheer', 155, 0, 3, '1.5', 1, 'fruity', '2024-01-09 15:19:51', 1),
      ('Cosmopolitan', 180, 15, 1, 4, 1, 'other', NOW(), 1),
      ('Corpse Reviver #2', 160, 18, 1, 5, 1, 'fruity', NOW(), 1),
      ('Daiquiri', 180, 12, 1, 5, 1, 'fruity', NOW(), 1),
      ('Dark and Stormy', 170, 15, 1, 4, 1, 'spicy', NOW(), 1),
      ('Date Delight', 160, 0, 4, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('Elderberry Elixir', 165, 0, 1, '1.5', 1, 'floral', '2024-01-09 15:19:51', 1),
      ('Espresso Martini', 150, 25, 1, 4.5, 1, 'salty', NOW(), 1),
      ('Fig Fizz', 170, 0, 2, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('French 75', 180, 15, 1, 4, 1, 'herbaceous', NOW(), 1),
      ('Gin Tonic', 120, 10, 1, 4, 1, 'sweet', NOW(), 1),
      ('Gin Fizz', 150, 10, 1, 4, 1, 'neutral', NOW(), 1),
      ('Grapefruit Glow', 175, 0, 3, '1.5', 1, 'bitter', '2024-01-09 15:19:51', 1),
      ('Honeydew Harmony', 180, 0, 4, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('Iced Berry Infusion', 185, 0, 1, '1.5', 1, 'fruity', '2024-01-09 15:19:51', 1),
      ('Jasmine Julep', 190, 0, 2, '1.5', 1, 'floral', '2024-01-09 15:19:51', 1),
      ('Kiwi Cooler', 195, 0, 3, '1.5', 1, 'sour', '2024-01-09 15:19:51', 1),
      ('Lemonade Luxe', 200, 0, 4, '1.5', 1, 'sour', '2024-01-09 15:19:51', 1),
      ('Long Island Iced Tea', 250, 20, 1, 5, 1, 'bitter', NOW(), 1),
      ('Mai Tai', 220, 15, 1, 4, 1, 'spicy', NOW(), 1),
      ('Mango Magic', 205, 0, 1, '1.5', 1, 'fruity', '2024-01-09 15:19:51', 1),
      ('Manhattan', 220, 18, 1, 5, 1, 'other', NOW(), 1),
      ('Martini', 180, 20, 1, 5, 1, 'sweet', NOW(), 1),
      ('Margarita', 200, 15, 1, 4, 1, 'fruity', NOW(), 1),
      ('Mint Julep', 160, 14, 1, 5, 2, 'other', NOW(), 1),
      ('Mojito', 160, 10, 1, 4.5, 2, 'floral', NOW(), 1),
      ('Moscow Mule', 180, 10, 1, 4.5, 2, 'spicy', NOW(), 1),
      ('Nectarine Nectar', 210, 0, 2, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('Negroni', 200, 22, 1, 4, 2, 'bitter', NOW(), 1),
      ('Old Fashioned', 220, 18, 1, 5, 2, 'other', NOW(), 1),
      ('Orange Oasis', 215, 0, 3, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1), 
      ('Paloma', 160, 12, 1, 4.5, 2, 'fruity', NOW(), 1),
      ('Peach Punch', 220, 0, 4, '1.5', 1, 'sweet', '2024-01-09 15:19:51', 1),
      ('Piña Colada', 250, 10, 1, 5, 2, 'sour', NOW(), 1),
      ('Quince Quencher', 225, 0, 1, '1.5', 1, 'other', '2024-01-09 15:19:51', 1), 
      ('Raspberry Mojito', 160, 10, 1, 4.5, 2, 'fruity', NOW(), 1),
      ('Raspberry Refresher', 230, 0, 2, '1.5', 1, 'sour', '2024-01-09 15:19:51', 1),
      ('Rum Punch', 200, 12, 1, 4.5, 2, 'fruity', NOW(), 1),
      ('Sazerac', 180, 16, 1, 5, 2, 'herbaceous', NOW(), 1),
      ('Screwdriver', 160, 8, 1, 4, 2, 'fruity', NOW(), 1),
      ('Singapore Sling', 180, 16, 1, 4.5, 2, 'fruity', NOW(), 1),
      ('Strawberry Splash', 235, 0, 3, '1.5', 1, 'fruity', '2024-01-09 15:19:51', 1),
      ('Tequila Sunrise', 180, 14, 1, 4, 2, 'fruity', NOW(), 1),
      ('Tom Collins', 150, 12, 1, 4, 2, 'floral', NOW(), 1),
      ('Tommys Margarita', 180, 15, 1, 4.5, 2, 'spicy', NOW(), 1),
      ('Tropical Twist', 240, 0, 4, '1.5', 1, 'fruity', '2024-01-09 15:19:51', 1),
      ('White Lady', 170, 16, 1, 4.5, 2, 'fruity', NOW(), 1),
      ('White Russian', 250, 14, 1, 5, 3, 'other', NOW(), 1);
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      TRUNCATE cocktail;
    `.execute(trx);
  });
}
