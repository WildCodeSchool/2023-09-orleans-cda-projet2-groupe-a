import { MoveRight, Skull } from 'lucide-react';

import type { Ingredient, IngredientsPartProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

export default function IngredientsPart({
  handleIngredientChange,
  errors,
  watch,
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

      <fieldset className='relative bottom-[2%] grid grid-flow-col grid-rows-3 gap-2 gap-x-4 sm:bottom-[4%]'>
        {isLoading
          ? undefined
          : data?.map((ingredient) => (
              <div key={ingredient.id} className='flex gap-3'>
                <input
                  className='hover:cursor-pointer'
                  type='radio'
                  id={ingredient.name}
                  value={watch('ingredient1.name')}
                  checked={watch('ingredient1.name') === ingredient.name}
                  onChange={() => {
                    handleIngredientChange(ingredient);
                  }}
                />
                <label
                  className='hover:cursor-pointer'
                  htmlFor={ingredient.name}
                >
                  {ingredient.name}
                </label>
              </div>
            ))}
      </fieldset>
      <div className='relative top-[33%] flex w-full items-center justify-end gap-2 md:top-[11%] md:me-[150px] lg:top-[24%] lg:me-0 lg:gap-6'>
        <p className='lg:text-md md:text-md font-stroke text-light text-end uppercase sm:w-[50%] lg:w-full'>
          {'Choose your blend or amend'}
        </p>
        <MoveRight size={40} />
        <button type='button'>
          <Skull size={45} />
        </button>
      </div>
    </>
  );
}
