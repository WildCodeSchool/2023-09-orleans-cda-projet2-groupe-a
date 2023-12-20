import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import type { IngredientsPartProps } from '@app/types';

import IngredientToChoose from './IngredientToChoose';

export default function IngredientsPart({
  errors,
  watch,
  setValue,
  setShow,
  setIsModalShown,
}: IngredientsPartProps) {
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
            <IngredientToChoose
              watch={watch}
              setValue={setValue}
              setShow={setShow}
              watchIngredient={watch('alcohol')}
              ingredient={'ingredient1'}
            />
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
            <IngredientToChoose
              watch={watch}
              setValue={setValue}
              setShow={setShow}
              watchIngredient={watch('ingredient1')}
              ingredient={'ingredient2'}
            />
          </motion.div>
        )}
      {watch('ingredient1') !== undefined &&
        watch('ingredient2') !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <IngredientToChoose
              watch={watch}
              setValue={setValue}
              setShow={setShow}
              watchIngredient={watch('ingredient2')}
              ingredient={'ingredient3'}
            />
          </motion.div>
        )}
    </>
  );
}
