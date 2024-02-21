import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Ingredient, IngredientsPartProps } from '@app/types';

import IngredientToChoose from './IngredientToChoose';

export default function IngredientsPart({
  setShow,
  setIsModalShown,
  actualIngredient,
  setActualIngredient,
}: IngredientsPartProps) {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [isFinished, setIsFinished] = useState(false);
  const [beforeIngredient, setBeforeIngredient] = useState(watch('alcohol'));

  const ingredients = watch('ingredients');

  useEffect(() => {
    if (ingredients !== undefined) {
      setBeforeIngredient(ingredients[actualIngredient - 1] as Ingredient);
    }
  }, [actualIngredient]);

  return (
    <>
      <div className='relative bottom-[3%] flex w-[250px] gap-3 sm:bottom-[10%]'>
        <h1 className=' text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
          {'Choose your fuse'}
        </h1>
        <button
          className={`${isFinished ? 'hidden' : 'block'}`}
          type='button'
          onClick={() => {
            setIsModalShown(true);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <IngredientToChoose
          watch={watch}
          setValue={setValue}
          setShow={setShow}
          beforeIngredient={beforeIngredient}
          actualIngredient={actualIngredient}
          setActualIngredient={setActualIngredient}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
        />
      </motion.div>
    </>
  );
}
