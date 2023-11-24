import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await sql`
    CREATE TABLE glass (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      capacity TINYINT UNSIGNED NOT NULL,
      image VARCHAR(255) NOT NULL,
      material ENUM('glass', 'crystal', 'metal', 'plastic', 'wood') NOT NULL
    );
  `.execute(db);

  // Table user
  await sql`
    CREATE TABLE user (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      pseudo VARCHAR(50) NOT NULL,
      image VARCHAR(255) NOT NULL,
      birthdate VARCHAR(25) NOT NULL,
      created_at DATETIME NOT NULL
    );
  `.execute(db);

  // Table ingredient
  await sql`
    CREATE TABLE ingredient (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      color VARCHAR(7) NOT NULL,
      kcal SMALLINT UNSIGNED NOT NULL,
      degree TINYINT UNSIGNED NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(255) NOT NULL,
      flavour ENUM('fruity', 'spicy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'sour', 'neutral') NOT NULL,
      family ENUM('water', 'alcohol', 'juice', 'soda', 'syrup', 'bitter', 'fruit', 'vegetable', 'herb', 'spice', 'milk', 'cream', 'condiment', 'other') NOT NULL
    );
  `.execute(db);

  // Table cocktail
  await sql`
    CREATE TABLE cocktail (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      total_kcal TINYINT UNSIGNED NULL NOT NULL,
      total_degree TINYINT UNSIGNED NOT NULL,
      author INT UNSIGNED,
      ratings_average ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10') NOT NULL,
      glass_id INT UNSIGNED NOT NULL,
      final_flavour ENUM('fruity', 'spicy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'sour', 'neutral') NOT NULL,
      created_at DATETIME NOT NULL,
      total_quantity SMALLINT UNSIGNED NOT NULL,
      FOREIGN KEY (author) REFERENCES user(id),
      FOREIGN KEY (glass_id) REFERENCES glass(id)
    );
  `.execute(db);

  // Table comment
  await sql`
    CREATE TABLE comment (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      cocktail_id INT UNSIGNED NOT NULL,
      content VARCHAR(255) NOT NULL,
      created_at DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (cocktail_id) REFERENCES cocktail(id)
    );
  `.execute(db);

  // Table favorite
  await sql`
    CREATE TABLE favorite (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      cocktail_id INT UNSIGNED NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (cocktail_id) REFERENCES cocktail(id)
    );
  `.execute(db);

  // Table rating
  await sql`
    CREATE TABLE rating (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      cocktail_id INT UNSIGNED NOT NULL,
      score ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10') NOT NULL,
      created_at DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (cocktail_id) REFERENCES cocktail(id)
    );
  `.execute(db);

  // Table topping
  await sql`
    CREATE TABLE topping (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
      name VARCHAR(50) NOT NULL
    );
  `.execute(db);

  // Table tool
  await sql`
    CREATE TABLE tool (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      image VARCHAR(255) NOT NULL
    );
  `.execute(db);

  // Table action
  await sql`
    CREATE TABLE action (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      verb ENUM('muddle', 'stir', 'shake', 'strain', 'build', 'mix', 'pour', 'garnish', 'twist', 'spritz', 'layer', 'float', 'rim', 'ignite', 'blend', 'top', 'chill', 'heat', 'smoke', 'double strain', 'express', 'infuse', 'dissolve', 'whip', 'squeeze', 'roll', 'dash', 'steam', 'blast chill', 'carbonate', 'mist', 'stir-fry') NOT NULL,
      priority TINYINT UNSIGNED NOT NULL,
      tool_id INT UNSIGNED NOT NULL,
      duration SMALLINT UNSIGNED NOT NULL,
      complexity TINYINT UNSIGNED NOT NULL,
      is_mandatory BOOL NOT NULL,
      FOREIGN KEY (tool_id) REFERENCES tool(id)
    );
  `.execute(db);

  // Table action_ingredient
  await sql`
    CREATE TABLE action_ingredient (
      ingredient_id INT UNSIGNED NOT NULL,
      action_id INT UNSIGNED NOT NULL,
      quantity SMALLINT UNSIGNED NOT NULL,
      FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
      FOREIGN KEY (action_id) REFERENCES action(id)
    );
  `.execute(db);

  // Table cocktail_topping
  await sql`
    CREATE TABLE cocktail_topping (
      cocktail_id INT UNSIGNED NOT NULL,
      topping_id INT UNSIGNED NOT NULL,
      quantity SMALLINT UNSIGNED NOT NULL,
      FOREIGN KEY (cocktail_id) REFERENCES cocktail(id),
      FOREIGN KEY (topping_id) REFERENCES topping(id)
    );
  `.execute(db);

  // Table recipe
  await sql`
    CREATE TABLE recipe (
      cocktail_id INT UNSIGNED,
      action_id INT UNSIGNED NOT NULL,
      total_complexity TINYINT UNSIGNED NOT NULL,
      total_duration SMALLINT UNSIGNED NOT NULL,
      step TINYINT UNSIGNED NOT NULL,
      FOREIGN KEY (cocktail_id) REFERENCES cocktail(id),
      FOREIGN KEY (action_id) REFERENCES action(id)
    );
  `.execute(db);
}

export async function down(db: Kysely<Database>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await sql`
    DROP TABLE recipe;
  `.execute(db);

  await sql`
    DROP TABLE cocktail_topping;
  `.execute(db);

  await sql`
    DROP TABLE action_ingredient;
  `.execute(db);

  await sql`
    DROP TABLE action;
  `.execute(db);

  await sql`
    DROP TABLE tool;
  `.execute(db);

  await sql`
    DROP TABLE topping;
  `.execute(db);

  await sql`
    DROP TABLE rating;
  `.execute(db);

  await sql`
    DROP TABLE favorite;
  `.execute(db);

  await sql`
    DROP TABLE comment;
  `.execute(db);

  await sql`
    DROP TABLE cocktail;
  `.execute(db);

  await sql`
    DROP TABLE ingredient;
  `.execute(db);

  await sql`
    DROP TABLE user;
  `.execute(db);

  await sql`
    DROP TABLE glass;
  `.execute(db);
}
