import { ArrowRight, CheckCircle2, MoveRight, Skull } from 'lucide-react';

import type { CocktailForm, Ingredient, IngredientProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

export default function IngredientToChoose({
  watch,
  setValue,
  setShow,
  beforeIngredient,
  actualIngredient,
  setActualIngredient,
  isFinished,
  setIsFinished,
}: IngredientProps) {
  const handleIngredientChange = (
    value: Pick<Ingredient, 'name' | 'id'>,
  ): void => {
    setValue(`ingredients[${actualIngredient}]` as keyof CocktailForm, value);
    setActualIngredient(actualIngredient + 1);
  };
  const url = `${import.meta.env.VITE_API_URL}/ingredient/${
    beforeIngredient?.id ?? 1
  }`;

  const { data, isLoading } =
    useFetch<Pick<Ingredient, 'name' | 'id' | 'flavour'>[]>(url);

  const randomIngredient = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ingredient/random`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setValue(`ingredients[${actualIngredient}]` as keyof CocktailForm, data);
      setActualIngredient(actualIngredient + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const allIngredients = () => {
    setIsFinished(true);
    setShow(5);
  };

  const goToNextIngredient = () => {
    setActualIngredient(actualIngredient + 1);
  };

  const ingredients = watch('ingredients');

  return isFinished && ingredients !== undefined ? (
    <ul className='relative bottom-[7%] right-[-7%] h-[100px] overflow-y-scroll sm:bottom-[30%] sm:right-[-13%]'>
      {ingredients.map((ingredient) => (
        <li key={ingredient.name} className='mx-2 mb-1'>
          {ingredient.name}
        </li>
      ))}
    </ul>
  ) : (
    <>
      <fieldset className='relative bottom-[7%] right-[-7%] grid h-[88px] w-[200px] grid-flow-col grid-rows-3 gap-2 gap-x-2 sm:bottom-[17%] sm:right-[-13%] sm:w-[300px]'>
        {isLoading
          ? undefined
          : data?.map((ingredient) => (
              <div key={ingredient.id} className='flex gap-3'>
                <input
                  className='hover:cursor-pointer'
                  type='radio'
                  id={ingredient.name}
                  value={
                    ingredients
                      ? ingredients[actualIngredient]?.name
                      : undefined
                  }
                  checked={
                    ingredients
                      ? ingredients[actualIngredient]?.name === ingredient.name
                      : false
                  }
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
      <div
        onClick={() => {
          allIngredients();
        }}
        className={`${ingredients ? 'visible opacity-100' : 'invisible opacity-0'} relative bottom-[10%] right-[-7%] flex gap-5 transition-all duration-200 ease-in-out hover:cursor-pointer sm:bottom-[10%] sm:right-[-35%]`}
      >
        <p>{'done?'}</p>
        <CheckCircle2 />
      </div>
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
