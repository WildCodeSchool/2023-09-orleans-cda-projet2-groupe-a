import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import type { Ingredient, IngredientsPartProps } from '@app/types';

import IngredientToChoose from './IngredientToChoose';

interface IngredientArray {
  beforeIngredient: Pick<Ingredient, 'id' | 'name'> | undefined;
  actualingredient: string;
  if: boolean;
}

export default function IngredientsPart({
  errors,
  watch,
  setValue,
  setShow,
  setIsModalShown,
}: IngredientsPartProps) {
  const ingredientArray = watch('ingredients');
  const ingredients: IngredientArray[] = [
    {
      beforeIngredient: watch('alcohol'),
      actualingredient: 'ingredients[0]',
      if: ingredientArray === undefined,
    },
    {
      beforeIngredient: ingredientArray ? ingredientArray[0] : undefined,
      actualingredient: 'ingredients[1]',
      if:
        ingredientArray !== undefined &&
        ingredientArray[0] !== undefined &&
        ingredientArray[1] === undefined &&
        ingredientArray[2] === undefined,
    },
    {
      beforeIngredient: ingredientArray ? ingredientArray[1] : undefined,
      actualingredient: 'ingredients[2]',
      if:
        ingredientArray !== undefined &&
        ingredientArray[0] !== undefined &&
        ingredientArray[1] !== undefined,
    },
  ];
  console.log({ ingredientArray });

  return (
    <>
      <div className='relative bottom-[3%] flex w-[250px] gap-3 sm:bottom-[10%]'>
        <h1 className=' text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
          {'Choose your fuse'}
        </h1>
        <button
          type='button'
          onClick={() => {
            setIsModalShown(true);
          }}
        >
          <Search size={30} />
        </button>
      </div>

      {/*  {errors.ingredient1?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredient1?.type === 'validate' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient1.message}
        </span>
      ) : undefined}

      {errors.ingredient2?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredient2?.type === 'validate' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient2.message}
        </span>
      ) : undefined}

      {errors.ingredient3?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredient3?.type === 'validate' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient3.message}
        </span>
      ) : undefined} */}

      {ingredients.map((ingredient) => {
        if (ingredient.if) {
          return (
            <motion.div
              key={ingredient.actualingredient}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <IngredientToChoose
                watch={watch}
                setValue={setValue}
                setShow={setShow}
                beforeIngredient={ingredient.beforeIngredient}
                actualingredient={ingredient.actualingredient}
              />
            </motion.div>
          );
        }
      })}
    </>
  );
}
