import type { Cocktail } from '.';

export interface CommentProps {
  numberComment: number;
}

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
  anecdote: string;
  file: string;
};

export type CocktailProps = {
  cocktail: Cocktail;
};
