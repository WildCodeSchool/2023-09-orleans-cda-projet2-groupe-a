import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { Glass, Ingredient, Topping } from '.';

export type CocktailForm = {
  name?: string;
  topping?: Topping;
  ingredients?: Pick<Ingredient, 'id' | 'name' | 'flavour'>[];
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
  errors: FieldErrors<CocktailForm>;
  watch: UseFormWatch<CocktailForm>;
  setValue?: (
    name: keyof CocktailForm,
    value: string | { id: number; name: string },
  ) => void;
  setShow?: (show: number) => void;
  setIsModalShown?: (isModalShown: boolean) => void;
  actualIngredient: number | undefined;
  setActualIngredient: (actualIngredient: number) => void;
  selectedIngredients?: Ingredient[];
  setSelectedIngredients?: (selectedIngredients: Ingredient[]) => void;
  handleIngredientChange?: (ingredient: Ingredient) => void;
}

export interface GlassPartProps {
  setValue: UseFormSetValue<CocktailForm>;
  handleGlassPartNextStepClick?: (section: number) => void;
  errors: FieldErrors<CocktailForm>;
}

export interface ToppingPartProps {
  register: UseFormRegister<CocktailForm>;
  selectedTopping: Topping | undefined;
  selectedAlcohol: Ingredient | null;
  handleToppingChange: (topping: Topping) => void;
  errors: FieldErrors<CocktailForm>;
  watch: UseFormWatch<CocktailForm>;
  selectedIngredients: Ingredient[];
}

export interface IngredientProps {
  watch: UseFormWatch<CocktailForm>;
  setValue: (
    name: keyof CocktailForm,
    value: string | { id: number; name: string },
  ) => void;
  setShow: (show: number) => void;
  beforeIngredient: Pick<Ingredient, 'name' | 'id'> | undefined;
  actualIngredient: number | undefined;
  setActualIngredient: (actualIngredient: number) => void;
}
