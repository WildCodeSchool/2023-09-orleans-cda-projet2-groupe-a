import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

export * from './database';

export type CocktailForm = {
  name?: string;
  nameRequired?: string;
  topping?: string;
  ingredient?: string;
  alcohol?: string;
  level?: number;
  glass?: string;
};

export interface AlcoholPart {
  isOpen: boolean;
  handleClickSelect: () => void;
  handleClickAlcohol: (alcohol: string) => void;
  watch: UseFormWatch<CocktailForm>;
}

export interface NamePart {
  register: UseFormRegister<CocktailForm>;
}

export interface LevelPart {
  level: number;
  handleClick: (level: number) => void;
}
export interface IngredientsPart {
  register: UseFormRegister<CocktailForm>;
  selectedIngredient: string;
  handleIngredientChange: (ingredient: string) => void;
}

export interface GlassPart {
  register: UseFormRegister<CocktailForm>;
}
export interface ToppingPart {
  register: UseFormRegister<CocktailForm>;
  selectedTopping: string;
  handleToppingChange: (topping: string) => void;
}
