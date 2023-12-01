import { sql } from 'kysely';

import { db } from '@app/backend-shared';

await db.transaction().execute(async (trx) => {
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
    ('Zucchini', 'Green', 17, 0, 'Mild and versatile', 'zucchini.jpg', 'neutral', 'vegetable');
  `.execute(trx);
});
