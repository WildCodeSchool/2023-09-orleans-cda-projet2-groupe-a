import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { CocktailForm, Ingredient, Topping } from '@app/types';

import AlcoholPart from '@/components/form-cocktail/AlcoholPart';
import GlassPart from '@/components/form-cocktail/GlassPart';
import IngredientsPart from '@/components/form-cocktail/IngredientsPart';
import LevelPart from '@/components/form-cocktail/LevelPart';
import NamePart from '@/components/form-cocktail/NamePart';
import SoftDrinks from '@/components/form-cocktail/SoftDrinks';
import Syrup from '@/components/form-cocktail/Syrup';
import ToppingPart from '@/components/form-cocktail/ToppingPart';

import FormPart from './FormPart';

interface UseSquareProps {
  readonly withAlcohol: boolean;
  readonly watch: UseFormWatch<CocktailForm>;
  readonly errors: FieldErrors;
  readonly register: UseFormRegister<CocktailForm>;
  readonly setValue: UseFormSetValue<CocktailForm>;
  readonly setShow: (show: number) => void;
  readonly setIsModalShown: (isModalShown: boolean) => void;
  readonly actualIngredient: number;
  readonly setActualIngredient: (actualIngredient: number) => void;
  readonly selectedTopping: Topping | undefined;
  readonly selectedAlcohol: Ingredient | null;
  readonly handleToppingChange: (topping: Topping) => void;
  readonly handleErrorSubmit: () => void;
  readonly level: number;
  readonly handleLevelClick: (level: number) => void;
  readonly setWithAlcohol: (withAlcocool: boolean) => void;
  readonly selectedAlcohols: Ingredient[];
  readonly handleClickAlcohol: (alcohol: Ingredient) => void;
  readonly handleClickSoftDrinks: (softDrink: Ingredient) => void;
  readonly handleClickSyrup: (syrup: Ingredient | null) => void;
  readonly show: number;
}
export default function GetSquares({
  withAlcohol,
  watch,
  errors,
  register,
  setValue,
  setShow,
  setIsModalShown,
  actualIngredient,
  setActualIngredient,
  selectedTopping,
  selectedAlcohol,
  handleToppingChange,
  handleErrorSubmit,
  level,
  handleLevelClick,
  setWithAlcohol,
  selectedAlcohols,
  handleClickAlcohol,
  handleClickSoftDrinks,
  handleClickSyrup,
  show,
}: UseSquareProps) {
  const baseSquares = [
    {
      color: 'blue',
      order: {
        lg: 5,
        md: 2,
      },
      biasSide: {
        lg: ['left'],
        md: ['left'],
      },
      width: {
        lg: 108,
        md: 105,
      },
      right: {
        lg: 8,
        md: 0,
      },
      component: (
        <IngredientsPart
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          setShow={setShow}
          setIsModalShown={setIsModalShown}
          actualIngredient={actualIngredient}
          setActualIngredient={setActualIngredient}
        />
      ),
    },
    {
      color: 'orange',
      order: {
        lg: 2,
        md: 5,
      },
      biasSide: {
        lg: ['right'],
        md: ['right'],
      },
      width: {
        lg: 110,
        md: 110,
      },
      right: {
        lg: 0,
        md: 10,
      },
      component: <GlassPart errors={errors} setValue={setValue} />,
    },
    {
      color: 'green',
      order: {
        lg: 4,
        md: 3,
      },
      biasSide: {
        lg: ['right', 'left'],
        md: ['right'],
      },
      width: {
        lg: 103,
        md: 105,
      },
      component: (
        <ToppingPart
          register={register}
          selectedTopping={selectedTopping}
          selectedAlcohol={selectedAlcohol}
          handleToppingChange={handleToppingChange}
          errors={errors}
          watch={watch}
          selectedIngredients={[]}
        />
      ),
    },
    {
      color: 'pink',
      order: {
        lg: '6',
        md: '6',
      },
      biasSide: {
        lg: ['left'],
        md: ['left'],
      },
      width: {
        lg: 104,
        md: 105,
      },
      right: {
        lg: 4,
        md: 5,
      },
      component: (
        <NamePart
          register={register}
          handleErrorSubmit={handleErrorSubmit}
          errors={errors}
        />
      ),
    },
  ];

  const squaresWithAlcohol = [
    {
      color: 'purple',
      order: {
        lg: 1,
        md: 1,
      },
      biasSide: {
        lg: ['right'],
        md: ['right'],
      },
      width: {
        lg: 110,
        md: 105,
      },
      component: (
        <LevelPart
          level={level}
          handleLevelClick={handleLevelClick}
          errors={errors}
          withAlcohol={withAlcohol}
          setWithAlcohol={setWithAlcohol}
        />
      ),
    },
    {
      color: 'yellow',
      order: {
        lg: 3,
        md: 4,
      },
      biasSide: {
        lg: ['right', 'left'],
        md: ['left'],
      },
      width: {
        lg: 130,
        md: 116,
      },
      right: {
        lg: 15,
        md: 16,
      },
      component: (
        <AlcoholPart
          alcohols={selectedAlcohols}
          handleClickAlcohol={handleClickAlcohol}
          watch={watch}
          errors={errors}
        />
      ),
    },
    ...baseSquares,
  ];

  const squaresWithoutAlcohol = [
    {
      color: 'purple',
      order: {
        lg: 1,
        md: 1,
      },
      biasSide: {
        lg: ['right'],
        md: ['right'],
      },
      width: {
        lg: 110,
        md: 105,
      },
      component: (
        <SoftDrinks
          watch={watch}
          handleClickSoftDrinks={handleClickSoftDrinks}
          errors={errors}
          withAlcohol={withAlcohol}
          setWithAlcohol={setWithAlcohol}
        />
      ),
    },
    {
      color: 'yellow',
      order: {
        lg: 3,
        md: 4,
      },
      biasSide: {
        lg: ['right', 'left'],
        md: ['left'],
      },
      width: {
        lg: 130,
        md: 116,
      },
      right: {
        lg: 15,
        md: 16,
      },
      component: (
        <Syrup
          watch={watch}
          handleClickSyrup={handleClickSyrup}
          errors={errors}
        />
      ),
    },
    ...baseSquares,
  ];

  return (
    <div className='grid w-screen grid-flow-col grid-rows-6 gap-1 gap-y-2 md:h-screen md:grid-rows-3 md:p-3 lg:grid-rows-2'>
      {withAlcohol
        ? squaresWithAlcohol.map((Component, index) => (
            <FormPart
              key={index}
              square={Component}
              index={index}
              show={show}
            />
          ))
        : squaresWithoutAlcohol.map((Component, index) => (
            <FormPart
              key={index}
              square={Component}
              index={index}
              show={show}
            />
          ))}
    </div>
  );
}
