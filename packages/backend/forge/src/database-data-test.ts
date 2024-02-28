import { sql } from 'kysely';

import { db } from '@app/backend-shared';

await db.transaction().execute(async (trx) => {
  await sql`
    INSERT INTO glass (name, capacity, image, material)
    VALUES
    ('Cocktail Glass', 150, 'cocktail-glass.jpg', 'glass'),
    ('Old Fashioned Glass', 200, 'old-fashioned-glass.jpg', 'glass'),
    ('Wine Glass', 400, 'wine-glass.jpg', 'glass'),
    ('Champagne Flute', 150, 'champagne.jpg', 'glass'),
    ('Tumbler', 350, 'tumbler.jpg', 'glass'),
    ('Shot Glass', 50, 'shot.jpg', 'glass'),
    ('Pint Glass', 500, 'pint.jpg', 'glass');
  `.execute(trx);

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

  await sql`
    INSERT INTO ingredient (name, color, kcal, degree, description, image, flavour, family)
    VALUES 
    ('Almond', 'Brown', 7, 0, 'Nutty and sweet', 'almond.jpg', 'sweet', 'fruit'),
    ('Anise', 'Brown', 22, 0, 'Licorice flavor', 'anise.jpg', 'spicy', 'spice'),
    ('Apple', 'Red', 52, 0, 'Crisp and sweet', 'apple.jpg', 'fruity', 'fruit'),
    ('Apricot', 'Orange', 48, 0, 'Sweet and velvety', 'apricot.jpg', 'fruity', 'fruit'),
    ('Avocado', 'Green', 160, 0, 'Creamy and rich', 'avocado.jpg', 'neutral', 'fruit'),
    ('Basil', 'Green', 3, 0, 'Aromatic herb', 'basil.jpg', 'herbaceous', 'herb'),
    ('Beer', 'Golden', 40, 5, 'Hoppy and malty', 'beer.jpg', 'bitter', 'alcohol'),
    ('Blackberry', 'Purple', 40, 0, 'Bold and juicy', 'blackberry.jpg', 'fruity', 'fruit'),
    ('Blueberry', 'Blue', 29, 0, 'Rich and sweet', 'blueberry.jpg', 'fruity', 'fruit'),
    ('Bourbon', 'Amber', 240, 40, 'Sweet and oaky', 'bourbon.jpg', 'sweet', 'alcohol'),
    ('Brandy', 'Amber', 65, 35, 'Fruity and warming', 'brandy.jpg', 'fruity', 'alcohol'),
    ('Cachaça', 'Clear', 50, 38, 'Sugarcane spirit', 'cachaca.jpg', 'other', 'alcohol'),
    ('Cantaloupe', 'Orange', 34, 0, 'Sweet and juicy', 'cantaloupe.jpg', 'fruity', 'fruit'),
    ('Caramel', 'Brown', 50, 0, 'Sweet and buttery', 'caramel.jpg', 'sweet', 'syrup'),
    ('Cauliflower', 'White', 25, 0, 'Mild and earthy', 'cauliflower.jpg', 'sweet', 'vegetable'),
    ('Champagne', 'Clear', 90, 12, 'Bubbly and celebratory', 'champagne.jpg', 'other', 'alcohol'),
    ('Cherry', 'Red', 50, 0, 'Sweet and tart', 'cherry.jpg', 'fruity', 'fruit'),
    ('Chervil', 'Green', 3, 0, 'Mild anise flavor', 'chervil.jpg', 'herbaceous', 'herb'),
    ('Chives', 'Green', 2, 0, 'Mild onion flavor', 'chives.jpg', 'salty', 'herb'),
    ('Chocolate', 'Brown', 230, 0, 'Rich and decadent', 'chocolate.jpg', 'sweet', 'other'),
    ('Cilantro', 'Green', 1, 0, 'Bright and citrusy', 'cilantro.jpg', 'herbaceous', 'herb'),
    ('Cinnamon', 'Brown', 6, 0, 'Warm and spicy', 'cinnamon.jpg', 'spicy', 'spice'),
    ('Clove', 'Brown', 21, 0, 'Strong and aromatic', 'clove.jpg', 'spicy', 'spice'),
    ('Coconut', 'White', 354, 0, 'Sweet and tropical', 'coconut.jpg', 'fruity', 'fruit'),
    ('Coffee', 'Brown', 2, 0, 'Bold and caffeinated', 'coffee.jpg', 'mixed', 'herb'),
    ('Coriander', 'Green', 2, 0, 'Citrusy and spicy', 'coriander.jpg', 'fresh', 'herb'),
    ('Corn', 'Yellow', 96, 0, 'Sweet and crunchy', 'corn.jpg', 'sweet', 'vegetable'),
    ('Cranberry', 'Red', 46, 0, 'Tart and tangy', 'cranberry.jpg', 'acidulous', 'fruit'),
    ('Cucumber', 'Green', 16, 0, 'Cool and crisp', 'cucumber.jpg', 'sweet', 'vegetable'),
    ('Currant', 'Red', 56, 0, 'Sweet and tangy', 'currant.jpg', 'acidulous', 'fruit'),
    ('Dill', 'Green', 2, 0, 'Grassy and tangy', 'dill.jpg', 'fresh', 'herb'),
    ('Dragon Fruit', 'Pink', 60, 0, 'Mild and refreshing', 'dragonfruit.jpg', 'sweet', 'fruit'),
    ('Eggplant', 'Purple', 25, 0, 'Mild and meaty', 'eggplant.jpg', 'other', 'vegetable'),
    ('Fennel', 'Green', 31, 0, 'Anise-like flavor', 'fennel.jpg', 'spicy', 'vegetable'),
    ('Fig', 'Purple', 74, 0, 'Sweet and chewy', 'fig.jpg', 'sweet', 'fruit'),
    ('Garlic', 'White', 5, 0, 'Pungent and savory', 'garlic.jpg', 'fresh', 'vegetable'),
    ('Gin', 'Clear', 96, 40, 'Botanical and juniper', 'gin.jpg', 'herbaceous', 'alcohol'),
    ('Ginger', 'Brown', 80, 0, 'Spicy and warming', 'ginger.jpg', 'spicy', 'spice'),
    ('Ginseng', 'Brown', 5, 0, 'Earthy and bitter', 'ginseng.jpg', 'other', 'herb'),
    ('Goji Berry', 'Red', 50, 0, 'Sweet and tangy', 'gojiberry.jpg', 'sweet', 'fruit'),
    ('Grape', 'Purple', 69, 0, 'Sweet and juicy', 'grape.jpg', 'fruity', 'fruit'),
    ('Green Bean', 'Green', 31, 0, 'Crisp and fresh', 'greenbean.jpg', 'other', 'vegetable'),
    ('Green Tea', 'Green', 2, 0, 'Grassy and soothing', 'greentea.jpg', 'other', 'herb'),
    ('Guava', 'Pink', 68, 0, 'Sweet and tropical', 'guava.jpg', 'fruity', 'fruit'),
    ('Hazelnut', 'Brown', 628, 0, 'Nutty and rich', 'hazelnut.jpg', 'other', 'fruit'),
    ('Honey', 'Yellow', 304, 0, 'Sweet and golden', 'honey.jpg', 'sweet', 'other'),
    ('Hops', 'Green', 0, 0, 'Bitter and floral', 'hops.jpg', 'bitter', 'herb'),
    ('Jalapeño', 'Green', 29, 0, 'Spicy and tangy', 'jalapeno.jpg', 'spicy', 'vegetable'),       
    ('Jasmine', 'White', 2, 0, 'Floral and fragrant', 'jasmine.jpg', 'floral', 'herb'),
    ('Kale', 'Green', 33, 0, 'Nutrient-dense and earthy', 'kale.jpg', 'herbaceous', 'vegetable'),
    ('Kiwi', 'Green', 61, 0, 'Tangy and tropical', 'kiwi.jpg', 'fruity', 'fruit'),
    ('Lavender', 'Purple', 4, 0, 'Floral and aromatic', 'lavender.jpg', 'floral', 'herb'),
    ('Leek', 'White', 61, 0, 'Mild and oniony', 'leek.jpg', 'other', 'vegetable'),
    ('Lemon', 'Yellow', 20, 0, 'Citrus flavor', 'lemon.jpg', 'sour', 'fruit'),
    ('Lemongrass', 'Green', 99, 0, 'Citrusy and lemony', 'lemongrass.jpg', 'other', 'herb'),
    ('Lime', 'Green', 30, 0, 'Tart and zesty', 'lime.jpg', 'sour', 'fruit'),
    ('Lychee', 'Pink', 66, 0, 'Sweet and floral', 'lychee.jpg', 'floral', 'fruit'),
    ('Mango', 'Orange', 60, 0, 'Sweet and tropical', 'mango.jpg', 'fruity', 'fruit'),
    ('Maple Syrup', 'Brown', 260, 0, 'Sweet and rich', 'maplesyrup.jpg', 'sweet', 'syrup'),
    ('Marjoram', 'Green', 3, 0, 'Sweet and citrusy', 'marjoram.jpg', 'sweet', 'herb'),
    ('Melon', 'Various', 34, 0, 'Sweet and refreshing', 'melon.jpg', 'sweet', 'fruit'),
    ('Mint', 'Green', 5, 0, 'Cool and refreshing', 'mint.jpg', 'fresh', 'herb'),
    ('Mushroom', 'Various', 22, 0, 'Umami and earthy', 'mushroom.jpg', 'earthy', 'vegetable'),
    ('Nutmeg', 'Brown', 525, 0, 'Warm and spicy', 'nutmeg.jpg', 'spicy', 'spice'),
    ('Olive', 'Green', 115, 0, 'Savory and briny', 'olive.jpg', 'salty', 'fruit'),
    ('Onion', 'White', 40, 0, 'Pungent and sweet', 'onion.jpg', 'sour', 'vegetable'),
    ('Orange', 'Orange', 47, 0, 'Citrusy and vibrant', 'orange.jpg', 'fruity', 'fruit'),
    ('Oregano', 'Green', 2, 0, 'Robust and peppery', 'oregano.jpg', 'fresh', 'herb'),
    ('Papaya', 'Orange', 43, 0, 'Sweet and tropical', 'papaya.jpg', 'fruity', 'fruit'),
    ('Paprika', 'Red', 19, 0, 'Smoky and sweet', 'paprika.jpg', 'other', 'spice'),
    ('Parsley', 'Green', 2, 0, 'Fresh and earthy', 'parsley.jpg', 'fresh', 'herb'),
    ('Peach', 'Orange', 39, 0, 'Sweet and velvety', 'peach.jpg', 'fruity', 'fruit'),
    ('Peanut', 'Brown', 567, 0, 'Nutty and crunchy', 'peanut.jpg', 'other', 'fruit'),
    ('Pear', 'Yellow', 57, 0, 'Sweet and juicy', 'pear.jpg', 'fruity', 'fruit'),
    ('Peppermint', 'Green', 70, 0, 'Cool and minty', 'peppermint.jpg', 'peppery', 'herb'),
    ('Persimmon', 'Orange', 81, 0, 'Sweet and honey-like', 'persimmon.jpg', 'sweet', 'fruit'),
    ('Pineapple', 'Yellow', 50, 0, 'Sweet and tropical', 'pineapple.jpg', 'fruity', 'fruit'),
    ('Pistachio', 'Green', 562, 0, 'Nutty and slightly sweet', 'pistachio.jpg', 'sweet', 'fruit'),
    ('Plum', 'Purple', 46, 0, 'Sweet and tart', 'plum.jpg', 'fruity', 'fruit'),
    ('Pomegranate', 'Red', 83, 0, 'Sweet and tangy', 'pomegranate.jpg', 'other', 'fruit'),
    ('Popcorn', 'Yellow', 30, 0, 'Buttery and salty', 'popcorn.jpg', 'other', 'other'),
    ('Pork', 'Pink', 242, 0, 'Rich and savory', 'pork.jpg', 'other', 'meat'),
    ('Potato', 'Brown', 130, 0, 'Starchy and versatile', 'potato.jpg', 'other', 'vegetable'),
    ('Pumpkin', 'Orange', 26, 0, 'Sweet and earthy', 'pumpkin.jpg', 'other', 'vegetable'),
    ('Red Wine', 'Red', 125, 12, 'Bold and full-bodied', 'redwine.jpg', 'other', 'alcohol'),
    ('Rosé', 'Pink', 100, 12, 'Light and refreshing', 'rose.jpg', 'other', 'alcohol'),
    ('Rum', 'Brown', 231, 40, 'Sweet and molasses', 'rum.jpg', 'sweet', 'alcohol'),
    ('Salmon', 'Pink', 206, 0, 'Rich and flaky', 'salmon.jpg', 'other', 'seafood'),
    ('Salt', 'White', 0, 0, 'Essential seasoning', 'salt.jpg', 'salty', 'condiment'),
    ('Scallion', 'Green', 32, 0, 'Mild onion flavor', 'scallion.jpg', 'sour', 'vegetable'),
    ('Sesame Seed', 'White', 573, 0, 'Nutty and crunchy', 'sesameseed.jpg', 'earthy', 'herb'),
    ('Shallot', 'Purple', 72, 0, 'Sweet and mild', 'shallot.jpg', 'sweet', 'vegetable'),
    ('Shrimp', 'Pink', 85, 0, 'Sweet and briny', 'shrimp.jpg', 'other', 'seafood'),
    ('Snow Pea', 'Green', 42, 0, 'Sweet and crisp', 'snowpea.jpg', 'other', 'vegetable'),
    ('Soy Sauce', 'Brown', 8, 0, 'Savory and salty', 'soysauce.jpg', 'salty', 'sauce'),
    ('Spinach', 'Green', 23, 0, 'Leafy and earthy', 'spinach.jpg', 'other', 'vegetable'),
    ('Strawberry', 'Red', 32, 0, 'Sweet and juicy', 'strawberry.jpg', 'fruity', 'fruit'),
    ('Sweet Potato', 'Orange', 86, 0, 'Sweet and starchy', 'sweetpotato.jpg', 'other', 'vegetable'),
    ('Tequila', 'Clear', 96, 40, 'Agave spirit', 'tequila.jpg', 'spicy', 'alcohol'),
    ('Tarragon', 'Green', 295, 0, 'Herbaceous and bittersweet', 'tarragon.jpg', 'fresh', 'herb'),
    ('Thyme', 'Green', 2, 0, 'Earthy and lemony', 'thyme.jpg', 'fresh', 'herb'),
    ('Tomato', 'Red', 18, 0, 'Juicy and acidic', 'tomato.jpg', 'sour', 'vegetable'),
    ('Tuna', 'Pink', 144, 0, 'Meaty and flavorful', 'tuna.jpg', 'umami', 'seafood'),
    ('Turmeric', 'Yellow', 354, 0, 'Warm and earthy', 'turmeric.jpg', 'other', 'spice'),
    ('Turnip', 'Purple', 28, 0, 'Peppery and sweet', 'turnip.jpg', 'other', 'vegetable'),
    ('Vanilla', 'Brown', 288, 0, 'Sweet and aromatic', 'vanilla.jpg', 'sweet', 'herb'),
    ('Vodka', 'Clear', 96, 40, 'Neutral and smooth', 'vodka.jpg', 'neutral', 'alcohol'),
    ('Walnut', 'Brown', 654, 0, 'Nutty and rich', 'walnut.jpg', 'other', 'fruit'),
    ('Wasabi', 'Green', 19, 0, 'Pungent and spicy', 'wasabi.jpg', 'spicy', 'condiment'),
    ('Watermelon', 'Red', 30, 0, 'Sweet and refreshing', 'watermelon.jpg', 'neutral', 'fruit'),
    ('Wheat Germ', 'Brown', 382, 0, 'Nutty and nutritious', 'wheatgerm.jpg', 'other', 'herb'),
    ('Whisky', 'Various', 250, 40, 'Rich and smoky', 'whisky.jpg', 'other', 'alcohol'),
    ('White Wine', 'White', 120, 12, 'Crisp and fruity', 'whitewine.jpg', 'fruity', 'alcohol'),
    ('Yogurt', 'White', 59, 0, 'Creamy and tangy', 'yogurt.jpg', 'other', 'cream'),
    ('Zucchini', 'Green', 17, 0, 'Mild and versatile', 'zucchini.jpg', 'neutral', 'vegetable'),
    ('Orange Juice', 'Orange', 45, 0, 'Freshly squeezed and citrusy', 'orangejuice.jpg', 'fruity', 'softdrink'),
    ('Schweppes', 'Various', 38, 0, 'Bubbly and refreshing', 'schweppes.jpg', 'neutral', 'softdrink'),
    ('Coca-Cola', 'Brown', 140, 0, 'Sweet and carbonated', 'cocacola.jpg', 'sweet', 'softdrink'),
    ('Multifruit Juice', 'Various', 60, 0, 'Blend of various fruits', 'multifruit.jpg', 'fruity', 'softdrink'),
    ('Sprite', 'Clear', 95, 0, 'Lemon-lime and bubbly', 'sprite.jpg', 'fruity', 'softdrink'),
    ('Fanta', 'Orange', 160, 0, 'Orange-flavored and fizzy', 'fanta.jpg', 'fruity', 'softdrink'),
    ('Pepsi', 'Brown', 150, 0, 'Sweet and cola-flavored', 'pepsi.jpg', 'sweet', 'softdrink'),
    ('Ginger Ale', 'Clear', 90, 0, 'Ginger-flavored and sparkling', 'gingerale.jpg', 'spicy', 'softdrink'),
    ('Lemonade', 'Yellow', 80, 0, 'Tart and refreshing', 'lemonade.jpg', 'sour', 'softdrink'),
    ('Iced Tea', 'Brown', 30, 0, 'Cool and tea-infused', 'icedtea.jpg', 'other', 'softdrink'),
    ('Club Soda', 'Clear', 0, 0, 'Carbonated and plain', 'clubsoda.jpg', 'neutral', 'softdrink'),
    ('Cranberry Juice', 'Red', 46, 0, 'Tart and tangy', 'cranberryjuice.jpg', 'acidulous', 'softdrink'),
    ('Apple Juice', 'Gold', 114, 0, 'Sweet and fruity', 'applejuice.jpg', 'fruity', 'softdrink'),
    ('Grapefruit Soda', 'Pink', 120, 0, 'Citrusy and effervescent', 'grapefruitsoda.jpg', 'fruity', 'softdrink'),
    ('Pineapple Juice', 'Yellow', 60, 0, 'Tropical and sweet', 'pineapplejuice.jpg', 'fruity', 'softdrink'),
    ('Blackcurrant Cordial', 'Purple', 50, 0, 'Rich and berry-flavored', 'blackcurrantcordial.jpg', 'fruity', 'softdrink'),
    ('Lime Cordial', 'Green', 40, 0, 'Tart and zesty', 'limecordial.jpg', 'sour', 'softdrink'),
    ('Cherry Cola', 'Red', 170, 0, 'Sweet and cherry-infused', 'cherrycola.jpg', 'fruity', 'softdrink'),
    ('Blue Raspberry Lemonade', 'Blue', 90, 0, 'Fruity and vibrant', 'blueraspberrylemonade.jpg', 'fruity', 'softdrink'),
    ('Mango Passionfruit Cooler', 'Orange', 120, 0, 'Tropical and exotic', 'mangopassionfruitcooler.jpg', 'fruity', 'softdrink'),
    ('Peach Iced Tea', 'Orange', 45, 0, 'Sweet and peach-flavored', 'peachicedtea.jpg', 'fruity', 'softdrink'),
    ('Strawberry Kiwi Splash', 'Red', 70, 0, 'Berry and tropical fusion', 'strawberrykiwisplash.jpg', 'fruity', 'softdrink'),
    ('Grape Juice', 'Purple', 60, 0, 'Sweet and grape-flavored', 'grapejuice.jpg', 'fruity', 'softdrink'),
    ('Limeade', 'Green', 65, 0, 'Tart and lime-infused', 'limeade.jpg', 'sour', 'softdrink'),
    ('Mango Nectar', 'Orange', 120, 0, 'Thick and mango-flavored', 'mangonectar.jpg', 'fruity', 'softdrink'),
    ('Raspberry Lemon Sparkler', 'Red', 80, 0, 'Raspberry and lemon combination', 'raspberrylemonsparkler.jpg', 'fruity', 'softdrink'),
    ('Lemon Lime Bitters', 'Yellow', 120, 0, 'Citrusy with a hint of bitterness', 'lemonlimebitters.jpg', 'fruity', 'softdrink'),
    ('Passionfruit Soda', 'Orange', 95, 0, 'Passionfruit-flavored and effervescent', 'passionfruitsoda.jpg', 'fruity', 'softdrink'),
    ('Hibiscus Cooler', 'Pink', 70, 0, 'Floral and refreshing', 'hibiscuscooler.jpg', 'floral', 'softdrink'),
    ('Pomegranate Lemonade', 'Red', 85, 0, 'Pomegranate-infused and tart', 'pomegranatelemonade.jpg', 'acidulous', 'softdrink'),
    ('Blueberry Sparkle', 'Blue', 60, 0, 'Sweet and blueberry-infused', 'blueberrysparkle.jpg', 'fruity', 'softdrink'),
    ('Passionfruit Iced Tea', 'Orange', 40, 0, 'Passionfruit-flavored and refreshing', 'passionfruiticedtea.jpg', 'fruity', 'softdrink'),
    ('Kiwi Lemonade', 'Green', 75, 0, 'Tart and kiwi-infused', 'kiwilemonade.jpg', 'sour', 'softdrink'),
    ('Peach Mango Fizz', 'Orange', 110, 0, 'Peach and mango combination', 'peachmangofizz.jpg', 'fruity', 'softdrink'),
    ('Strawberry Pineapple Splash', 'Red', 90, 0, 'Strawberry and pineapple fusion', 'strawberrypineapplesplash.jpg', 'fruity', 'softdrink'),
    ('Coconut Water', 'Clear', 45, 0, 'Natural and hydrating', 'coconutwater.jpg', 'neutral', 'softdrink'),
    ('Raspberry Fizz', 'Red', 80, 0, 'Raspberry-flavored and fizzy', 'raspberryfizz.jpg', 'fruity', 'softdrink'),
    ('Lime Mint Cooler', 'Green', 65, 0, 'Refreshing lime and mint infusion', 'limemintcooler.jpg', 'fruity', 'softdrink'),
    ('Blackberry Lemonade', 'Purple', 75, 0, 'Sweet and tart blackberry with lemon', 'blackberrylemonade.jpg', 'fruity', 'softdrink'),
    ('Orange Creamsicle', 'Orange', 120, 0, 'Citrusy orange with creamy vanilla', 'orangecreamsicle.jpg', 'fruity', 'softdrink'),
    ('Pineapple Coconut Splash', 'Yellow', 90, 0, 'Tropical pineapple with creamy coconut', 'pineapplecoconutsplash.jpg', 'fruity', 'softdrink'),
    ('Strawberry Banana Smoothie', 'Pink', 150, 0, 'Smooth blend of strawberry and banana', 'strawberrybananasmoothie.jpg', 'fruity', 'softdrink'),
    ('Mint Lemon Iced Tea', 'Green', 30, 0, 'Iced tea with a hint of mint and lemon', 'mintlemonicedtea.jpg', 'fruity', 'softdrink'),
    ('Blueberry Mint Sparkler', 'Blue', 70, 0, 'Blueberry-infused sparkler with a touch of mint', 'blueberrymintsparkler.jpg', 'fruity', 'softdrink'),
    ('Peach Raspberry Refresher', 'Orange', 85, 0, 'Peach and raspberry combination', 'peachraspberryrefresher.jpg', 'fruity', 'softdrink'),
    ('Cucumber Mint Splash', 'Green', 25, 0, 'Cool cucumber with a hint of refreshing mint', 'cucumbermintsplash.jpg', 'fruity', 'softdrink'),
    ('Vanilla Syrup', 'Brown', 200, 0, 'Sweet and aromatic vanilla flavor', 'vanillasyrup.jpg', 'sweet', 'syrup'),
    ('Caramel Syrup', 'Brown', 180, 0, 'Rich and buttery caramel infusion', 'caramelsyrup.jpg', 'sweet', 'syrup'),
    ('Hazelnut Syrup', 'Brown', 210, 0, 'Nutty and flavorful hazelnut essence', 'hazelnutsyrup.jpg', 'fruity', 'syrup'),
    ('Raspberry Syrup', 'Red', 160, 0, 'Sweet and tangy raspberry infusion', 'raspberrysyrup.jpg', 'fruity', 'syrup'),
    ('Strawberry Syrup', 'Red', 140, 0, 'Sweet and vibrant strawberry flavor', 'strawberrysyrup.jpg', 'fruity', 'syrup'),
    ('Blueberry Syrup', 'Blue', 150, 0, 'Rich and fruity blueberry essence', 'blueberrysyrup.jpg', 'fruity', 'syrup'),
    ('Peach Syrup', 'Orange', 170, 0, 'Sweet and juicy peach infusion', 'peachsyrup.jpg', 'fruity', 'syrup'),
    ('Coconut Syrup', 'White', 180, 0, 'Sweet and tropical coconut flavor', 'coconutsyrup.jpg', 'fruity', 'syrup'),
    ('Mint Syrup', 'Green', 120, 0, 'Cool and refreshing mint infusion', 'mintsyrup.jpg', 'fruity', 'syrup'),
    ('Lemon Syrup', 'Yellow', 130, 0, 'Citrusy and zesty lemon essence', 'lemonsyrup.jpg', 'fruity', 'syrup'),
    ('Orange Syrup', 'Orange', 140, 0, 'Sweet and citrusy orange flavor', 'orangesyrup.jpg', 'fruity', 'syrup'),
    ('Cherry Syrup', 'Red', 160, 0, 'Sweet and tart cherry infusion', 'cherrysyrup.jpg', 'fruity', 'syrup'),
    ('Pineapple Syrup', 'Yellow', 150, 0, 'Tropical and sweet pineapple essence', 'pineapplesyrup.jpg', 'fruity', 'syrup'),
    ('Gingerbread Syrup', 'Brown', 190, 0, 'Warm and spicy gingerbread flavor', 'gingerbreadsyrup.jpg', 'spicy', 'syrup'),
    ('Maple Syrup', 'Brown', 220, 0, 'Rich and sweet maple essence', 'maplesyrup.jpg', 'sweet', 'syrup'),
    ('Ice', 'Clear', 0, 0, 'Frozen water', 'ice.jpg', 'neutral', 'other');
  `.execute(trx);

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

  await sql`
    INSERT INTO favorite (user_id, cocktail_id)
    VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (1, 9),
    (1, 10),
    (1, 11),
    (1, 12),
    (1, 13),
    (1, 14),
    (1, 15),
    (1, 16),
    (2, 2),
    (3, 3);
  `.execute(trx);

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

  await sql`
    INSERT INTO tool (name, image)
    VALUES
    ('Shaker', 'shaker.png'),
    ('Knife', 'knife.png'),
    ('Spoon', 'spoon.jpg'),
    ('Muddler', 'muddler.png'),
    ('Bar Spoon', 'bar-spoon.png'),
    ('Jigger', 'jigger.png'),
    ('Strainer', 'strainer.png'),
    ('Citrus Juicer', 'citrus-juicer.png'),
    ('Blender', 'blender.png'),
    ('Ice Pick', 'ice-pick.png'),
    ('Stirring Glass', 'stirring-glass.png');
  `.execute(trx);

  await sql`
    INSERT INTO action (verb, priority, tool_id, duration, complexity, is_mandatory)
    VALUES
    ('muddle', 1, 1, 30, 3, true),
    ('stir', 2, 2 , 20, 2, false),
    ('shake', 3, 3, 15, 2, false),
    ('strain', 4, 4, 25, 3, true),
    ('build', 5, 5, 20, 2, true),
    ('mix', 6, 6, 15, 2, true),
    ('pour', 7, 7, 10, 1, true),
    ('garnish', 8, 8, 5, 1, false),
    ('twist', 9, 8, 15, 2, false),
    ('spritz', 10, 6, 12, 2, false),
    ('layer', 11, 4, 8, 2, false),
    ('float', 12, 3, 30, 3, true),
    ('rim', 13, 1, 5, 2, false),
    ('ignite', 14, 4, 10, 2, false);
  `.execute(trx);

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

  await sql`
    INSERT INTO cocktail_topping (cocktail_id, topping_id, quantity)
    VALUES
    (24, 7, 2),
    (12, 1, 3),
    (33, 6, 1),
    (18, 2, 4),
    (29, 8, 2),
    (8, 4, 3),
    (21, 1, 2),
    (7, 8, 1),
    (14, 6, 4),
    (30, 4, 3),
    (5, 1, 2),
    (36, 4, 1),
    (19, 5, 3),
    (26, 3, 2),
    (9, 8, 1),
    (32, 6, 4),
    (15, 7, 2),
    (22, 3, 1),
    (2, 2, 4),
    (28, 1, 2),
    (11, 4, 1),
    (25, 4, 3),
    (13, 6, 2),
    (34, 8, 1),
    (17, 5, 3),
    (31, 7, 2),
    (6, 3, 1),
    (23, 1, 4),
    (10, 8, 3),
    (35, 8, 2),
    (20, 4, 1),
    (27, 6, 4),
    (4, 8, 2),
    (16, 5, 1),
    (1, 3, 3),
    (3, 2, 2);
  `.execute(trx);

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