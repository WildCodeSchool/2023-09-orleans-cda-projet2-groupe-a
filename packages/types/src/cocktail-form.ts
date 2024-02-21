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
  softDrink?: Ingredient;
  syrup?: Ingredient | null;
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
  watch: UseFormWatch<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
  show: number;
  setShow: (show: number) => void;
  setSelectedAlcohol: (alcohol: Ingredient) => void;
}

export interface NamePartProps {
  register: UseFormRegister<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
}

export interface LevelPartProps {
  level: number;
  errors: FieldErrors<CocktailForm>;
  setWithAlcohol: (withAlcocool: boolean) => void;
  withAlcohol: boolean;
  setSelectedAlcohols: (alcohols: Ingredient[]) => void;
  setLevel: (level: number) => void;
  show: number;
  setShow: (show: number) => void;
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
  errors: FieldErrors<CocktailForm>;
  watch: UseFormWatch<CocktailForm>;
  selectedIngredients: Ingredient[];
  setSelectedTopping: (topping: Topping) => void;
  show: number;
  setShow: (show: number) => void;
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
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;
}

export interface SoftDrinksProps {
  watch: UseFormWatch<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
  setWithAlcohol: (withAlcocool: boolean) => void;
  withAlcohol: boolean;
  show: number;
  setShow: (show: number) => void;
}

export interface SyrupProps {
  watch: UseFormWatch<CocktailForm>;
  errors: FieldErrors<CocktailForm>;
  show: number;
  setShow: (show: number) => void;
}
