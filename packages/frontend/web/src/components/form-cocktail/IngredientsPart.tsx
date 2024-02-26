import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import type { Ingredient, IngredientsPartProps } from '@app/types';

import IngredientToChoose from './IngredientToChoose';

interface IngredientArray {
  beforeIngredient: Pick<Ingredient, 'id' | 'name'> | undefined;
  condition: boolean;
}

export default function IngredientsPart({
  errors,
  watch,
  setValue,
  setShow,
  setIsModalShown,
  actualIngredient,
  setActualIngredient,
}: IngredientsPartProps) {
  const ingredientArray = watch('ingredients');
  const ingredients: IngredientArray[] = [
    {
      beforeIngredient: watch('alcohol'),
      condition: ingredientArray === undefined,
    },
    {
      beforeIngredient: ingredientArray?.[0],
      condition:
        ingredientArray?.[0] !== undefined && ingredientArray[1] === undefined,
    },
    {
      beforeIngredient: ingredientArray?.[1],
      condition:
        ingredientArray?.[0] !== undefined && ingredientArray[1] !== undefined,
    },
  ];

  return (
    <>
      <div className='relative bottom-[3%] flex w-[250px] gap-3 sm:bottom-[10%]'>
        <h1 className=' text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
          {'Choose your fuse'}
        </h1>
        <button
          type='button'
          onClick={() => {
            if (setIsModalShown) {
              setIsModalShown(true);
            }
          }}
        >
          <Search size={30} />
        </button>
      </div>

      {errors.ingredients?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredients?.type === 'validate' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredients.message}
        </span>
      ) : undefined}
      {ingredients.map((ingredient) => {
        if (ingredient.condition) {
          return (
            <motion.div
              key={`ingredients[${actualIngredient}]`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <IngredientToChoose
                watch={watch}
                setValue={setValue || (() => {})}
                setShow={setShow || (() => {})}
                beforeIngredient={ingredient.beforeIngredient}
                actualIngredient={actualIngredient}
                setActualIngredient={setActualIngredient}
              />
            </motion.div>
          );
        }
      })}
    </>
  );
}
