import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      CREATE TABLE IF NOT EXISTS glass (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        capacity TINYINT UNSIGNED NOT NULL,
        image VARCHAR(255) NOT NULL,
        material ENUM('glass', 'crystal', 'metal', 'plastic', 'wood') NOT NULL
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS user (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        pseudo VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL,
        birthdate VARCHAR(25) NOT NULL,
        created_at DATETIME NOT NULL
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS ingredient (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        color VARCHAR(7) NOT NULL,
        kcal SMALLINT UNSIGNED NOT NULL,
        degree TINYINT UNSIGNED NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        flavour ENUM('fruity', 'spicy', 'earthy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'peppery', 'mixed', 'fresh', 'acidulous', 'sour', 'neutral', 'umami', 'astringent', 'other') NOT NULL,
        family ENUM('water', 'alcohol', 'juice', 'soda', 'syrup', 'bitter', 'fruit', 'vegetable', 'herb', 'spice', 'sauce', 'milk', 'cream', 'condiment', 'meat', 'seafood', 'other') NOT NULL
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS cocktail (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        total_kcal TINYINT UNSIGNED NULL NOT NULL,
        total_degree TINYINT UNSIGNED NOT NULL,
        author INT UNSIGNED NOT NULL,
        ratings_average ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10') NOT NULL,
        glass_id INT UNSIGNED NOT NULL,
        final_flavour ENUM('fruity', 'spicy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'sour', 'neutral', 'other') NOT NULL,
        created_at DATETIME NOT NULL,
        total_quantity SMALLINT UNSIGNED NOT NULL,
        FOREIGN KEY (author) REFERENCES user(id),
        FOREIGN KEY (glass_id) REFERENCES glass(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS comment (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        cocktail_id INT UNSIGNED NOT NULL,
        content VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS favorite (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        cocktail_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS rating (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        cocktail_id INT UNSIGNED NOT NULL,
        score ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10') NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS topping (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name VARCHAR(50) NOT NULL
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS tool (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS action (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        verb ENUM('muddle', 'stir', 'shake', 'strain', 'build', 'mix', 'pour', 'garnish', 'twist', 'spritz', 'layer', 'float', 'rim', 'ignite', 'blend', 'top', 'chill', 'heat', 'smoke', 'double strain', 'express', 'infuse', 'dissolve', 'whip', 'squeeze', 'roll', 'dash', 'steam', 'blast chill', 'carbonate', 'mist', 'stir-fry') NOT NULL,
        priority TINYINT UNSIGNED NOT NULL,
        tool_id INT UNSIGNED NOT NULL,
        duration SMALLINT UNSIGNED NOT NULL,
        complexity TINYINT UNSIGNED NOT NULL,
        is_mandatory BOOL NOT NULL,
        FOREIGN KEY (tool_id) REFERENCES tool(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS action_ingredient (
        ingredient_id INT UNSIGNED NOT NULL,
        action_id INT UNSIGNED NOT NULL,
        quantity SMALLINT UNSIGNED NOT NULL,
        FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
        FOREIGN KEY (action_id) REFERENCES action(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS cocktail_topping (
        cocktail_id INT UNSIGNED NOT NULL,
        topping_id INT UNSIGNED NOT NULL,
        quantity SMALLINT UNSIGNED NOT NULL,
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(id),
        FOREIGN KEY (topping_id) REFERENCES topping(id)
      );
    `.execute(trx);

    await sql`
      CREATE TABLE IF NOT EXISTS recipe (
        cocktail_id INT UNSIGNED,
        action_id INT UNSIGNED NOT NULL,
        total_complexity TINYINT UNSIGNED NOT NULL,
        total_duration SMALLINT UNSIGNED NOT NULL,
        step TINYINT UNSIGNED NOT NULL,
        FOREIGN KEY (cocktail_id) REFERENCES cocktail(id),
        FOREIGN KEY (action_id) REFERENCES action(id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE IF EXISTS recipe;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS cocktail_topping;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS action_ingredient;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS action;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS tool;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS topping;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS rating;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS favorite;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS comment;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS cocktail;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS ingredient;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS user;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS glass;
    `.execute(trx);
  });
}
