import { MoveRight, Skull } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { IngredientsPartProps, Oneingredient } from '@app/types';

import useFetch from '@/hook/use-fetch';

export default function IngredientsPart({
  register,
  selectedIngredient,
  handleIngredientChange,
  errors,
  watch,
}: IngredientsPartProps) {
  const [url, setUrl] = useState(
    `${import.meta.env.VITE_API_URL}/ingredient/${watch('alcohol.id')}`,
  );

  const { data, isLoading } = useFetch<Oneingredient[]>(url);

  useEffect(() => {
    setUrl(`http://localhost:3333/api/ingredient/${watch('alcohol.id')}`);
  }, [watch('alcohol')]);

  return (
    <>
      <h1 className='relative bottom-[3%] w-[250px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your fuse'}
      </h1>

      {errors.ingredient?.type === 'required' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.ingredient?.type === 'maxLength' ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {errors.ingredient.message}
        </span>
      ) : undefined}
      {errors.ingredient?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.ingredient.message}
        </span>
      ) : undefined}

      <fieldset className='relative bottom-[2%] grid grid-flow-col grid-rows-3 gap-2 gap-x-4 sm:bottom-[4%]'>
        {isLoading
          ? undefined
          : data.map((ingredient: Oneingredient) => (
              <div key={ingredient.name} className='flex gap-3'>
                <input
                  className='hover:cursor-pointer'
                  type='radio'
                  id={ingredient.name}
                  value={ingredient.name}
                  {...register('ingredient', {
                    required: true,
                    maxLength: {
                      value: 255,
                      message: "can't be longer than 255",
                    },
                    validate: {
                      isString: (value) =>
                        typeof value === 'string' || 'Must be a string',
                    },
                  })}
                  checked={selectedIngredient === ingredient.name}
                  onChange={() => {
                    handleIngredientChange(ingredient.name);
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
