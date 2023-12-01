import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

export * from './database';

export type CocktailForm = {
  name?: string;
  topping?: string;
  ingredient?: string;
  alcohol?: string;
  level?: number;
  glass?: string;
};

export interface AlcoholPart {
  handleClickAlcohol: (alcohol: string) => void;
  watch: UseFormWatch<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
}

export interface NamePart {
  register: UseFormRegister<CocktailForm>;
  handleErroSubmit: () => void;
  errors: FieldErrors<CocktailForm>;
}

export interface LevelPart {
  level: number;
  handleClick: (level: number) => void;
  errors: FieldErrors<CocktailForm>;
}
export interface IngredientsPart {
  register: UseFormRegister<CocktailForm>;
  selectedIngredient: string;
  handleIngredientChange: (ingredient: string) => void;
  errors: FieldErrors<CocktailForm>;
}

export interface GlassPart {
  register: UseFormRegister<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
}
export interface ToppingPart {
  register: UseFormRegister<CocktailForm>;
  selectedTopping: string;
  handleToppingChange: (topping: string) => void;
  errors: FieldErrors<CocktailForm>;
}
