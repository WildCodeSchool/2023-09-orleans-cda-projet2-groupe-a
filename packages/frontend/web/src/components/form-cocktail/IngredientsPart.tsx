import type { Ingredient, IngredientsPartProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

import Ingredient1 from './ingredients/Ingredient1';

export default function IngredientsPart({
  errors,
  watch,
  setValue,
  setShow,
}: IngredientsPartProps) {
  const url = `${import.meta.env.VITE_API_URL}/ingredient/${watch(
    'alcohol.id',
  )}`;

  const { data, isLoading } = useFetch<Pick<Ingredient, 'name' | 'id'>[]>(url);

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
      {errors.ingredient1?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient1.message}
        </span>
      ) : undefined}

      {errors.ingredient2?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredient2?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient2.message}
        </span>
      ) : undefined}

      {errors.ingredient3?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredient3?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient3.message}
        </span>
      ) : undefined}
      <Ingredient1
        isLoading={isLoading}
        data={data}
        watch={watch}
        setValue={setValue}
        setShow={setShow}
      />
    </>
  );
}
