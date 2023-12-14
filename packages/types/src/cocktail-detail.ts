import type { Cocktail } from '.';

export interface StarRatingProps {
  starCount: number;
}

export interface StarProps {
  index: number;
}

// Upload image
export type File = {
  originalname: 'string';
  filename: 'string';
};

// Input de la page cocktail-detail
export type InputCocktailForm = {
  anecdote?: string;
  file?: string;
  content?: string;
};

export type CocktailProps = {
  cocktail: Cocktail;
};

export type IngredientsProps = {
  ingredient_id: number;
  ingredient_name: string;
  quantity: number;
  verb: string;
  priority: number;
};

export type ToppingsProps = {
  topping_id: number;
  topping_name: string;
  topping_quantity: number;
};

export type ToolsProps = {
  tool_id: number;
  tool_name: string;
  tool_image: string;
};

export type CommentsProps = {
  comment_id: number;
  comment_user: string;
  cocktail_id: number;
  content: string;
  user_id: number;
  numberComment: number;
};

export type RatingsProps = {
  rating_id: number;
  score: number;
  user_id: number;
  cocktail_id: number;
};

export interface CocktailCommentsProps {
  comments: CommentsProps[] | undefined;
  ratings: RatingsProps[] | undefined;
}
