import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { Glass, Ingredient } from '.';

export type CocktailForm = {
  name?: string;
  topping?: string;
  ingredients?: Pick<Ingredient, 'id' | 'name'>[];
  alcohol?: Ingredient;
  level?: number;
  glass?: Pick<Glass, 'name' | 'id'>;
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
  actualIngredient: number;
  setActualIngredient: (actualIngredient: number) => void;
}

export interface GlassPartProps {
  errors: FieldErrors<CocktailForm>;
  setValue: UseFormSetValue<CocktailForm>;
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
  beforeIngredient: Pick<Ingredient, 'name' | 'id'> | undefined;
  actualIngredient: number;
  setActualIngredient: (actualIngredient: number) => void;
}
