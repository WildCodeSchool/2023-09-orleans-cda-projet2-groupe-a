import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import type { Ingredient } from '.';

export type CocktailForm = {
  name?: string;
  topping?: string;
  ingredient1?: Pick<Ingredient, 'id' | 'name'>;
  ingredient2?: Pick<Ingredient, 'id' | 'name'>;
  ingredient3?: Pick<Ingredient, 'id' | 'name'>;
  alcohol?: Ingredient;
  level?: number;
  glass?: string;
};

export interface AlcoholPartProps {
  alcohols: Ingredient[];
  handleClickAlcohol: (alcohol: Ingredient) => void;
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
  handleLevelClick: (level: number) => void;
  errors: FieldErrors<CocktailForm>;
}
export interface IngredientsPartProps {
  register: UseFormRegister<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
  watch: UseFormWatch<CocktailForm>;
  setValue: (
    name: keyof CocktailForm,
    value: string | { id: number; name: string },
  ) => void;
  setShow: (show: number) => void;
  setIsModalShown: (isModalShown: boolean) => void;
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

export interface IngredientProps {
  watch: UseFormWatch<CocktailForm>;
  setValue: (
    name: keyof CocktailForm,
    value: string | { id: number; name: string },
  ) => void;
  setShow: (show: number) => void;
}
