import { type Kysely, sql } from 'kysely';

import type { Database } from '@app/types';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    // Create product table
    await sql`
      CREATE TABLE IF NOT EXISTS product (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        price DECIMAL(10, 2) NOT NULL
      );
    `.execute(trx);

    // Create criteria table
    await sql`
      CREATE TABLE IF NOT EXISTS criteria (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `.execute(trx);

    // Create criteria_value table
    await sql`
      CREATE TABLE IF NOT EXISTS criteria_value (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        criteria_id INT UNSIGNED NOT NULL,
        value VARCHAR(255) NOT NULL,
        FOREIGN KEY (criteria_id) REFERENCES criteria(id)
      );
    `.execute(trx);

    // Create consumer table
    await sql`
      CREATE TABLE IF NOT EXISTS consumer (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        birthdate DATETIME NOT NULL,
        gender ENUM('male', 'female', 'other') NOT NULL,
        country VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL
      );
    `.execute(trx);

    // Create command table
    await sql`
      CREATE TABLE IF NOT EXISTS command (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME NOT NULL,
        consumer_id INT UNSIGNED NOT NULL,
        totalAmount DECIMAL(10, 2) NOT NULL,
        totalQuantity INT UNSIGNED NOT NULL,
        status ENUM('pending', 'completed', 'cancelled') NOT NULL,
        FOREIGN KEY (consumer_id) REFERENCES consumer(id)
      );
    `.execute(trx);

    // Create command_line table
    await sql`
      CREATE TABLE IF NOT EXISTS command_line (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        command_id INT UNSIGNED NOT NULL,
        product_id INT UNSIGNED NOT NULL,
        quantity INT UNSIGNED NOT NULL,
        unity_price DECIMAL(10, 2) NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (command_id) REFERENCES command(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
      );
    `.execute(trx);

    // Create consumer_value table
    await sql`
      CREATE TABLE IF NOT EXISTS consumer_value (
        consumer_id INT UNSIGNED NOT NULL,
        criteria_value_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (consumer_id) REFERENCES consumer(id),
        FOREIGN KEY (criteria_value_id) REFERENCES criteria_value(id),
        PRIMARY KEY (consumer_id, criteria_value_id)
      );
    `.execute(trx);

    // Create product_value table
    await sql`
      CREATE TABLE IF NOT EXISTS product_value (
        product_id INT UNSIGNED NOT NULL,
        criteria_value_id INT UNSIGNED NOT NULL,
        FOREIGN KEY (product_id) REFERENCES product(id),
        FOREIGN KEY (criteria_value_id) REFERENCES criteria_value(id),
        PRIMARY KEY (product_id, criteria_value_id)
      );
    `.execute(trx);
  });
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    // Drop product_value table
    await sql`
      DROP TABLE IF EXISTS product_value;
    `.execute(trx);

    // Drop consumer_value table
    await sql`
      DROP TABLE IF EXISTS consumer_value;
    `.execute(trx);

    // Drop command_line table
    await sql`
      DROP TABLE IF EXISTS command_line;
    `.execute(trx);

    // Drop command table
    await sql`
      DROP TABLE IF EXISTS command;
    `.execute(trx);

    // Drop consumer table
    await sql`
      DROP TABLE IF EXISTS consumer;
    `.execute(trx);

    // Drop criteria_value table
    await sql`
      DROP TABLE IF EXISTS criteria_value;
    `.execute(trx);

    // Drop criteria table
    await sql`
      DROP TABLE IF EXISTS criteria;
    `.execute(trx);

    // Drop product table
    await sql`
      DROP TABLE IF EXISTS product;
    `.execute(trx);
  });
}
