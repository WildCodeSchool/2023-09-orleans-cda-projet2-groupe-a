import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import type { Ingredient } from '.';

export type CocktailForm = {
  name?: string;
  topping?: string;
  ingredient?: string;
  alcohol?: string;
  level?: number;
  glass?: string;
};

export interface AlcoholPartProps {
  alcohols: Ingredient[];
  handleClickAlcohol: (alcohol: string) => void;
  watch: UseFormWatch<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
}

export interface NamePartProps {
  register: UseFormRegister<CocktailForm>;
  handleErrorSubmit: () => void;
  errors: FieldErrors<CocktailForm>;
}

export interface LevelPartProps {
  level: number;
  handleLevelClick: (level: number, res: Response) => void;
  errors: FieldErrors<CocktailForm>;
}
export interface IngredientsPartProps {
  register: UseFormRegister<CocktailForm>;
  selectedIngredient: string;
  handleIngredientChange: (ingredient: string) => void;
  errors: FieldErrors<CocktailForm>;
}

export interface GlassPartProps {
  register: UseFormRegister<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
}

export interface ToppingPartProps {
  register: UseFormRegister<CocktailForm>;
  selectedTopping: string;
  handleToppingChange: (topping: string) => void;
  errors: FieldErrors<CocktailForm>;
}
