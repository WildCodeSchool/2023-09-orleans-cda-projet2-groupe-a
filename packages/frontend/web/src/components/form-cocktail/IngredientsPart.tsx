import { MoveRight, Skull } from 'lucide-react';

import type { IngredientsPart } from '@app/types/src/cocktail-form';

const ingredients = ['mint', 'salmon', 'ice', 'coriander', 'orange', 'lemon'];

export default function IngredientsPart({
  register,
  selectedIngredient,
  handleIngredientChange,
  errors,
}: IngredientsPart) {
  return (
    <>
      <h1 className='relative bottom-[3%] w-[250px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your fuse'}
      </h1>
      {errors.ingredient ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      <fieldset className='relative bottom-[2%] grid grid-flow-col grid-rows-3 gap-2 gap-x-4 sm:bottom-[4%]'>
        {ingredients.map((ingredient) => (
          <div key={ingredient} className='flex gap-3'>
            <input
              className='hover:cursor-pointer'
              type='radio'
              id={ingredient}
              value={ingredient}
              {...register('ingredient', { required: true })}
              checked={selectedIngredient === ingredient}
              onChange={() => {
                handleIngredientChange(ingredient);
              }}
            />
            <label className='hover:cursor-pointer' htmlFor={ingredient}>
              {ingredient}
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
