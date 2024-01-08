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
  ingredient?: string;
  alcohol?: Ingredient;
  level?: number;
  glass?: Pick<Glass, 'name' | 'id'>;
  flavours?: {
    sweet: number;
    spicy: number;
    fruity: number;
    neutral: number;
    herbaceous: number;
    bitter: number;
    other: number;
    salty: number;
    mixed: number;
    fresh: number;
    acidulous: number;
    floral: number;
    sour: number;
    earthy: number;
    peppery: number;
    umami: number;
  };
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
  selectedIngredient: Ingredient | null;
  handleIngredientChange: (ingredient: Ingredient | null) => void;
  watch: UseFormWatch<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
}

export interface GlassPartProps {
  errors: FieldErrors<CocktailForm>;
  setValue: UseFormSetValue<CocktailForm>;
}

export interface ToppingPartProps {
  register: UseFormRegister<CocktailForm>;
  selectedTopping: string;
  selectedIngredient: Ingredient | null;
  selectedAlcohol: Ingredient | null;
  handleToppingChange: (topping: string) => void;
  errors: FieldErrors<CocktailForm>;
}
