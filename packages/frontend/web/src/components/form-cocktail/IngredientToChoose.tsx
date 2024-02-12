import { MoveRight, Skull } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { CocktailForm, Ingredient, IngredientProps } from '@app/types';

export default function IngredientToChoose({
  watch,
  setValue,
  setShow,
  beforeIngredient,
  actualIngredient,
  setActualIngredient,
}: IngredientProps) {
  const [ingredientsList, setIngredientsList] =
    useState<Pick<Ingredient, 'name' | 'id' | 'flavour'>[]>();
  const [isLoading, setIsLoading] = useState(true);

  const handleIngredientChange = (
    value: Pick<Ingredient, 'name' | 'id'>,
  ): void => {
    if (typeof actualIngredient === 'number') {
      setValue(`ingredients[${actualIngredient}]` as keyof CocktailForm, value);
      setActualIngredient(actualIngredient + 1);
      if (actualIngredient === 2) {
        // Notez que nous utilisons le nombre directement ici
        setShow(5);
      }
    }
  };

  const fetchData = async (url: RequestInfo, controller: AbortController) => {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    const info = await res.json();

    setIngredientsList(info);
    setIsLoading(false);
  };

  const ingredients = watch('ingredients') as Ingredient[];

  const queryParameters = new URLSearchParams();

  queryParameters.append(`alcohol`, watch('alcohol.name'));

  if (ingredients !== undefined) {
    for (const [index, ingredient] of ingredients.entries()) {
      queryParameters.append(`ingredient${index}`, ingredient.name);
    }
  }

  const url = `/api/ingredient/${beforeIngredient?.id ?? 1}?${queryParameters.toString()}`;

  useEffect(() => {
    const controller = new AbortController();
    fetchData(url, controller).catch(() => {
      setIsLoading(false);
      console.error('the fetch doesnt work');
    });
    return () => {
      controller.abort();
    };
  }, [url]);

  const randomIngredient = async () => {
    try {
      const response = await fetch(
        `/api/ingredient/random?${queryParameters.toString()}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setValue(`ingredients[${actualIngredient}]` as keyof CocktailForm, data);
      actualIngredient !== undefined &&
        setActualIngredient(actualIngredient + 1);
      if (`ingredients[${actualIngredient}]` === 'ingredients[2]') {
        setShow(5);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return `ingredients[${actualIngredient}]` === 'ingredients[3]' &&
    ingredients !== undefined ? (
    <ul className='relative bottom-[7%] right-[-7%] h-[136px] sm:bottom-[10%] sm:right-[-13%]'>
      <li className='mb-2'>{ingredients[0].name}</li>
      <li className='mb-2'>{ingredients[1].name}</li>
      <li>{ingredients[2].name}</li>
    </ul>
  ) : (
    <>
      <fieldset className='relative bottom-[7%] right-[-7%] grid h-[88px] w-[200px] grid-flow-col grid-rows-3 gap-2 gap-x-2 sm:bottom-[10%] sm:right-[-13%] sm:w-[300px]'>
        {isLoading
          ? undefined
          : ingredientsList?.map((ingredient) => (
              <div key={ingredient.id} className='flex gap-3'>
                <input
                  className='hover:cursor-pointer'
                  type='radio'
                  id={ingredient.name}
                  value={ingredients ? ingredients[2]?.name : undefined}
                  checked={
                    ingredients
                      ? ingredients[2]?.name === ingredient.name
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
