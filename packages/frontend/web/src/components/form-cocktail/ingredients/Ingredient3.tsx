import { MoveRight, Skull } from 'lucide-react';

import type { Ingredient, IngredientProps } from '@app/types';

export default function Ingredient3({
  isLoading,
  data,
  watch,
  setValue,
  setShow,
}: IngredientProps) {
  const handleIngredientChange = (value: Pick<Ingredient, 'name' | 'id'>) => {
    setValue(`ingredient3`, value);
    setShow(5);
  };

  return (
    <>
      <fieldset className='relative bottom-[2%] grid grid-flow-col grid-rows-3 gap-2 gap-x-4 sm:bottom-[4%]'>
        {isLoading
          ? undefined
          : data?.map((ingredient) => (
              <div key={ingredient.id} className='flex gap-3'>
                <input
                  className='hover:cursor-pointer'
                  type='radio'
                  id={ingredient.name}
                  value={watch('ingredient3.name')}
                  checked={watch('ingredient3.name') === ingredient.name}
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
