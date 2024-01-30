import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export type Flavour =
  | 'fruity'
  | 'spicy'
  | 'herbaceous'
  | 'floral'
  | 'woody'
  | 'bitter'
  | 'sweet'
  | 'salty'
  | 'sour'
  | 'neutral';
export interface GlassTable {
  id: Generated<number>;
  name: string;
  capacity: number;
  image: string;
  material: 'glass' | 'crystal' | 'metal' | 'plastic' | 'wood';
}
export interface UserTable {
  id: Generated<number>;
  email: string;
  password: string;
  pseudo: string;
  image?: string;
  birthdate: string;
  created_at?: Date;
  color?: string;
}
export interface IngredientTable {
  id: Generated<number>;
  name: string;
  color: string;
  kcal: number;
  degree: number;
  description: string;
  image: string;
  flavour:
    | 'fruity'
    | 'spicy'
    | 'herbaceous'
    | 'floral'
    | 'woody'
    | 'bitter'
    | 'sweet'
    | 'salty'
    | 'sour'
    | 'neutral';
  family:
    | 'water'
    | 'alcohol'
    | 'juice'
    | 'soda'
    | 'syrup'
    | 'bitter'
    | 'fruit'
    | 'vegetable'
    | 'herb'
    | 'spice'
    | 'milk'
    | 'cream'
    | 'condiment'
    | 'other';
}
export interface CocktailTable {
  id: Generated<number>;
  name: string;
  image: string;
  total_kcal?: number;
  total_degree: number;
  author: number;
  ratings_average:
    | '0'
    | '0.5'
    | '1'
    | '1.5'
    | '2'
    | '2.5'
    | '3'
    | '3.5'
    | '4'
    | '4.5'
    | '5';
  glass_id: number;
  final_flavour:
    | 'fruity'
    | 'spicy'
    | 'herbaceous'
    | 'floral'
    | 'woody'
    | 'bitter'
    | 'sweet'
    | 'salty'
    | 'sour'
    | 'neutral';
  created_at: Date;
  total_quantity: number;
  anecdote: string;
}
export interface CommentTable {
  id: Generated<number>;
  user_id: number;
  cocktail_id: number;
  content: string;
  created_at: Date;
}
export interface FavoriteTable {
  id: Generated<number>;
  user_id: number;
  cocktail_id: number;
}
export interface RatingTable {
  id: Generated<number>;
  user_id: number;
  cocktail_id: number;
  score:
    | '0'
    | '0.5'
    | '1'
    | '1.5'
    | '2'
    | '2.5'
    | '3'
    | '3.5'
    | '4'
    | '4.5'
    | '5';
  created_at: Date;
}
export interface ToppingTable {
  id: Generated<number>;
  name: string;
}
export interface ToolTable {
  id: Generated<number>;
  name: string;
  image: string;
}
export interface ActionTable {
  id: Generated<number>;
  verb:
    | 'muddle'
    | 'stir'
    | 'shake'
    | 'strain'
    | 'build'
    | 'mix'
    | 'pour'
    | 'garnish'
    | 'twist'
    | 'spritz'
    | 'layer'
    | 'float'
    | 'rim'
    | 'ignite'
    | 'blend'
    | 'top'
    | 'chill'
    | 'heat'
    | 'smoke'
    | 'double strain'
    | 'express'
    | 'infuse'
    | 'dissolve'
    | 'whip'
    | 'squeeze'
    | 'roll'
    | 'dash'
    | 'steam'
    | 'blast chill'
    | 'carbonate'
    | 'mist'
    | 'stir-fry';
  priority: number;
  tool_id: number;
  duration: number;
  complexity: number;
  is_mandatory: boolean;
}
export interface ActionIngredientTable {
  ingredient_id: number;
  action_id: number;
  quantity: number;
}
export interface CocktailToppingTable {
  cocktail_id: number;
  topping_id: number;
  quantity: number;
}
export interface RecipeTable {
  cocktail_id: number;
  action_id: number;
  total_complexity: number;
  total_duration: number;
  step: number;
}
export type Database = {
  glass: GlassTable;
  user: UserTable;
  ingredient: IngredientTable;
  cocktail: CocktailTable;
  comment: CommentTable;
  favorite: FavoriteTable;
  rating: RatingTable;
  topping: ToppingTable;
  tool: ToolTable;
  action: ActionTable;
  action_ingredient: ActionIngredientTable;
  cocktail_topping: CocktailToppingTable;
  recipe: RecipeTable;
};
export type Glass = Selectable<GlassTable>;
export type NewGlass = Insertable<GlassTable>;
export type GlassUpdate = Updateable<GlassTable>;

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Ingredient = Selectable<IngredientTable>;
export type NewIngredient = Insertable<IngredientTable>;
export type IngredientUpdate = Updateable<IngredientTable>;

export type Cocktail = Selectable<CocktailTable>;
export type NewCocktail = Insertable<CocktailTable>;
export type CocktailUpdate = Updateable<CocktailTable>;

export type Comment = Selectable<CommentTable>;
export type NewComment = Insertable<CommentTable>;
export type CommentUpdate = Updateable<CommentTable>;

export type Favorite = Selectable<FavoriteTable>;
export type NewFavorite = Insertable<FavoriteTable>;
export type FavoriteUpdate = Updateable<FavoriteTable>;

export type Rating = Selectable<RatingTable>;
export type NewRating = Insertable<RatingTable>;
export type RatingUpdate = Updateable<RatingTable>;

export type Topping = Selectable<ToppingTable>;
export type NewTopping = Insertable<ToppingTable>;
export type ToppingUpdate = Updateable<ToppingTable>;

export type Tool = Selectable<ToolTable>;
export type NewTool = Insertable<ToolTable>;
export type ToolUpdate = Updateable<ToolTable>;

export type Action = Selectable<ActionTable>;
export type NewAction = Insertable<ActionTable>;
export type ActionUpdate = Updateable<ActionTable>;

export type ActionIngredient = Selectable<ActionIngredientTable>;
export type NewActionIngredient = Insertable<ActionIngredientTable>;
export type ActionIngredientUpdate = Updateable<ActionIngredientTable>;

export type CocktailTopping = Selectable<CocktailToppingTable>;
export type NewCocktailTopping = Insertable<CocktailToppingTable>;
export type CocktailToppingUpdate = Updateable<CocktailToppingTable>;

export type Recipe = Selectable<RecipeTable>;
export type NewRecipe = Insertable<RecipeTable>;
export type RecipeUpdate = Updateable<RecipeTable>;
