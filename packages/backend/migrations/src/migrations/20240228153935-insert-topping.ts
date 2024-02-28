import { sql } from 'kysely';

import { db } from '@app/backend-shared';

await db.transaction().execute(async (trx) => {
  await sql`
    INSERT INTO topping (name, flavour)
    VALUES
    ('Whipped Cream', 'sweet'),
    ('Cherry', 'sweet'),
    ('Lime Twist', 'sour'),
    ('Orange Zest', 'fruity'),
    ('Mint Sprig', 'herbaceous'),
    ('Cinnamon Stick', 'spicy'),
    ('Nutmeg Dust', 'spicy'),
    ('Almond Slices', 'other'),
    ('Anise Crunch', 'spicy'),
    ('Apple Chunks', 'fruity'),
    ('Avocado Swirl', 'neutral'),
    ('Basil Leaves', 'herbaceous'),
    ('Blueberry Burst', 'fruity'),
    ('Caramel Drizzle', 'sweet'),
    ('Cinnamon Twist', 'spicy'),
    ('Coconut Shreds', 'fruity'),
    ('Ginger Infusion', 'spicy'),
    ('Kiwi Slices', 'fruity'),
    ('Mango Delight', 'fruity'),
    ('Peachy Perfection', 'fruity'),
    ('Pistachio Sprinkle', 'other'),
    ('Strawberry Bliss', 'fruity'),
    ('Ginger Slice', 'spicy');
  `.execute(trx);
});
