import { MoveRight, Skull } from 'lucide-react';

import type { Ingredient, IngredientProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

export default function Ingredient1({
  watch,
  setValue,
}: Omit<IngredientProps, 'setShow'>) {
  const handleIngredientChange = (value: Pick<Ingredient, 'name' | 'id'>) => {
    setValue(`ingredient1`, value);
  };

  const url = `${import.meta.env.VITE_API_URL}/ingredient/${watch(
    'alcohol.id',
  )}`;

  const { data, isLoading } = useFetch<Pick<Ingredient, 'name' | 'id'>[]>(url);

  const randomIngredient = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ingredient/random/${watch(
          'alcohol.id',
        )}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setValue('ingredient1', data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <fieldset className=' relative bottom-[7%] right-[-7%] grid w-[200px] grid-flow-col grid-rows-3 gap-2 gap-x-2 sm:bottom-[10%] sm:right-[-13%] sm:w-[300px]'>
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
      <div className='relative top-[210%] flex w-full items-center justify-end gap-2 md:right-[12%] md:top-[11%] lg:right-[0%] lg:top-[70%] lg:me-0 lg:gap-6'>
        <p className='lg:text-md md:text-md font-stroke text-light text-end uppercase sm:w-[50%] lg:w-full'>
          {'Choose your blend or amend'}
        </p>
        <MoveRight size={40} />
        <button
          type='button'
          onClick={async () => {
            await randomIngredient();
          }}
        >
          <Skull size={45} />
        </button>
      </div>
    </>
  );
}
