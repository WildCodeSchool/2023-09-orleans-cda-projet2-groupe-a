import { z } from 'zod';

const userColorEnum = z.enum([
  'blue',
  'pink',
  'orange',
  'red',
  'green',
  'yellow',
  'purple',
]);
const flavourEnum = z.enum([
  'fruity',
  'spicy',
  'earthy',
  'herbaceous',
  'floral',
  'woody',
  'bitter',
  'sweet',
  'salty',
  'peppery',
  'mixed',
  'fresh',
  'acidulous',
  'sour',
  'neutral',
  'umami',
  'astringent',
  'other',
]);
const ingredientFamilyEnum = z.enum([
  'water',
  'alcohol',
  'juice',
  'soda',
  'syrup',
  'bitter',
  'fruit',
  'vegetable',
  'herb',
  'spice',
  'sauce',
  'milk',
  'cream',
  'condiment',
  'meat',
  'seafood',
  'other',
]);
const glassMaterialEnum = z.enum([
  'glass',
  'crystal',
  'metal',
  'plastic',
  'wood',
]);
const cocktailRatingAverageEnum = z.enum([
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
]);

export const cocktailSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255).optional(),
  image: z.string().optional(),
  total_kcal: z.number().min(0).optional(),
  total_degree: z.number().min(0).max(100).optional(),
  author: z.number().int().min(1).optional(),
  ratings_average: cocktailRatingAverageEnum.optional(),
  final_flavour: flavourEnum.optional(),
  total_quantity: z.number().min(0).optional(),
  anecdote: z.string().max(1024).optional(),
});

export const glassSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255),
  capacity: z.number(),
  image: z.string(),
  material: glassMaterialEnum,
});

export const glassSchemaPut = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255).optional(),
  capacity: z.number().optional(),
  image: z.string().optional(),
  material: glassMaterialEnum.optional(),
});

export const ingredientSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255),
  color: z.string().min(3),
  kcal: z.number().min(0),
  degree: z.number().min(0).max(100),
  description: z.string(),
  image: z.string(),
  flavour: flavourEnum,
  family: ingredientFamilyEnum,
});

export const ingredientSchemaPut = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255).optional(),
  color: z.string().min(3).optional(),
  kcal: z.number().min(0).optional(),
  degree: z.number().min(0).max(100).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  flavour: flavourEnum.optional(),
  family: ingredientFamilyEnum.optional(),
});

export const toppingSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255),
  flavour: flavourEnum,
});

export const toppingSchemaPut = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2).max(255).optional(),
  flavour: flavourEnum.optional(),
});

export const userSchema = z.object({
  id: z.number().int().optional(),
  email: z.string().min(2).max(255).optional(),
  password: z.string().optional(),
  pseudo: z.string().optional(),
  image: z.string().optional(),
  birthdate: z.string().optional(),
  created_at: z.string().optional(),
  color: userColorEnum.optional(),
});
