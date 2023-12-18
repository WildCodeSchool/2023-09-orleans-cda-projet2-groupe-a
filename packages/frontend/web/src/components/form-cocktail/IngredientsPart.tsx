import { motion } from 'framer-motion';

import type { IngredientsPartProps } from '@app/types';

import Ingredient1 from './ingredients/Ingredient1';
import Ingredient2 from './ingredients/Ingredient2';
import Ingredient3 from './ingredients/Ingredient3';

export default function IngredientsPart({
  errors,
  watch,
  setValue,
  setShow,
}: IngredientsPartProps) {
  return (
    <>
      <h1 className='relative bottom-[3%] w-[250px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your fuse'}
      </h1>

      {errors.ingredient1?.type === 'required' ? (
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
      ) : undefined}

      {watch('ingredient1') === undefined &&
        watch('ingredient2') === undefined &&
        watch('ingredient3') === undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Ingredient1 watch={watch} setValue={setValue} />
          </motion.div>
        )}
      {watch('ingredient1') !== undefined &&
        watch('ingredient2') === undefined &&
        watch('ingredient3') === undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Ingredient2 watch={watch} setValue={setValue} />
          </motion.div>
        )}
      {watch('ingredient1') !== undefined &&
        watch('ingredient2') !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Ingredient3 watch={watch} setValue={setValue} setShow={setShow} />
          </motion.div>
        )}
    </>
  );
}
