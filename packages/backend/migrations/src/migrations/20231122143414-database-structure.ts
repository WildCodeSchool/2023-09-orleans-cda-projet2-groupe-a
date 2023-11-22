import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  // Migration code that update the database to the desired state.
  await sql`
    CREATE TABLE glass (
      id int AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      capacity TINYINT UNSIGNED,
      image VARCHAR(255),
      material ENUM('glass', 'crystal', 'metal', 'plastic', 'wood')
    );
  `.execute(db);

  await sql`
    CREATE TABLE user (
      id int AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255),
      password VARCHAR(255),
      pseudo VARCHAR(50),
      image VARCHAR(255),
      birthdate date,
      created_at datetime
    );
  `.execute(db);

  await sql`
    CREATE TABLE ingredient (
      id int AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      color VARCHAR(7),
      kcal SMALLINT UNSIGNED,
      degree TINYINT UNSIGNED,
      description text,
      image VARCHAR(255),
      flavour ENUM('fruity', 'spicy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'sour', 'neutral'),
      family ENUM('water', 'alcohol', 'juice', 'soda', 'syrup', 'bitter', 'fruit', 'vegetable', 'herb', 'spice', 'milk', 'cream', 'condiment', 'other')
    );
  `.execute(db);

  await sql`
    CREATE TABLE cocktail (
      id int AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      image VARCHAR(255),
      total_kcal TINYINT UNSIGNED NULL,
      total_degree TINYINT UNSIGNED,
      author int,
      ratings_average ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'),
      glass_id int,
      final_flavour ENUM('fruity', 'spicy', 'herbaceous', 'floral', 'woody', 'bitter', 'sweet', 'salty', 'sour', 'neutral'),
      created_at datetime,
      total_quantity SMALLINT UNSIGNED
    );
  `.execute(db);

  await sql`
    CREATE TABLE comment (
      id int AUTO_INCREMENT PRIMARY KEY,
      user_id int,
      cocktail_id int,
      content VARCHAR(255),
      created_at datetime
    );
  `.execute(db);

  await sql`
    CREATE TABLE favorite (
      id int AUTO_INCREMENT PRIMARY KEY,
      user_id int,
      cocktail_id int
    );
  `.execute(db);

  await sql`
    CREATE TABLE rating (
      id int AUTO_INCREMENT PRIMARY KEY,
      user_id int,
      cocktail_id int,
      score ENUM('0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'),
      created_at datetime
    );
  `.execute(db);

  await sql`
    CREATE TABLE topping (
      id int AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50)
    );
  `.execute(db);

  await sql`
    CREATE TABLE tool (
      id int AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      image VARCHAR(255)
    );
  `.execute(db);

  await sql`
    CREATE TABLE action (
      id int AUTO_INCREMENT PRIMARY KEY,
      verb ENUM('muddle', 'stir', 'shake', 'strain', 'build', 'mix', 'pour', 'garnish', 'twist', 'spritz', 'layer', 'float', 'rim', 'ignite', 'blend', 'top', 'chill', 'heat', 'smoke', 'double strain', 'express', 'infuse', 'dissolve', 'whip', 'squeeze', 'roll', 'dash', 'steam', 'blast chill', 'carbonate', 'mist', 'stir-fry'),
      priority TINYINT UNSIGNED,
      tool_id int,
      duration SMALLINT UNSIGNED,
      complexity TINYINT UNSIGNED,
      is_mandatory bool
    );
  `.execute(db);

  await sql`
    CREATE TABLE action_ingredient (
      ingredient_id int,
      action_id int,
      quantity SMALLINT UNSIGNED
    );
  `.execute(db);

  await sql`
    CREATE TABLE cocktail_topping (
      cocktail_id int,
      topping_id int,
      quantity SMALLINT UNSIGNED
    );
  `.execute(db);

  await sql`
    CREATE TABLE recipe (
      cocktail_id int,
      action_id int,
      total_complexity TINYINT UNSIGNED,
      total_duration SMALLINT UNSIGNED,
      step TINYINT UNSIGNED
    );
  `.execute(db);

  await sql`
    ALTER TABLE cocktail
    ADD FOREIGN KEY (author) REFERENCES user(id),
    ADD FOREIGN KEY (glass_id) REFERENCES glass(id);
  `.execute(db);

  await sql`
    ALTER TABLE comment
    ADD FOREIGN KEY (user_id) REFERENCES user(id),
    ADD FOREIGN KEY (cocktail_id) REFERENCES cocktail(id);
  `.execute(db);

  await sql`
    ALTER TABLE favorite
    ADD FOREIGN KEY (user_id) REFERENCES user(id),
    ADD FOREIGN KEY (cocktail_id) REFERENCES cocktail(id);
  `.execute(db);

  await sql`
    ALTER TABLE rating
    ADD FOREIGN KEY (user_id) REFERENCES user(id),
    ADD FOREIGN KEY (cocktail_id) REFERENCES cocktail(id);
  `.execute(db);

  await sql`
    ALTER TABLE action
    ADD FOREIGN KEY (tool_id) REFERENCES tool(id);
  `.execute(db);

  await sql`
    ALTER TABLE action_ingredient
    ADD FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
    ADD FOREIGN KEY (action_id) REFERENCES action(id);
  `.execute(db);

  await sql`
    ALTER TABLE cocktail_topping
    ADD FOREIGN KEY (cocktail_id) REFERENCES cocktail(id),
    ADD FOREIGN KEY (topping_id) REFERENCES topping(id);
  `.execute(db);

  await sql`
    ALTER TABLE recipe
    ADD FOREIGN KEY (cocktail_id) REFERENCES cocktail(id),
    ADD FOREIGN KEY (action_id) REFERENCES action(id);
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
