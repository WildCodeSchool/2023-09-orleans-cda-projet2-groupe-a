import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormWatch } from 'react-hook-form';

import type { CocktailForm, Ingredient } from '@app/types';

interface ModalSearchProps {
  readonly setIsModalShown: (isModalShown: boolean) => void;
  readonly setValue: (
    name: keyof CocktailForm,
    value: string | { id: number; name: string },
  ) => void;
  readonly watchIngredient: UseFormWatch<CocktailForm>;
  readonly setShow: (show: number) => void;
  readonly actualIngredient: number;
  readonly setActualIngredient: (actualIngredient: number) => void;
}

interface SearchIngredient {
  readonly searchIngredient: string;
}

export default function ModalSearch({
  setIsModalShown,
  setValue,
  watchIngredient,
  setShow,
  actualIngredient,
  setActualIngredient,
}: ModalSearchProps) {
  const { register, watch } = useForm<SearchIngredient>();
  const [data, setData] = useState<Pick<Ingredient, 'name' | 'id'>[]>();
  const [isLoading, setIsLoading] = useState(true);

  const url = `/api/ingredient/search/${watch('searchIngredient')}`;

  const searchIngredient = watch('searchIngredient');

  const fetchData = async (url: RequestInfo, controller: AbortController) => {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    const info = await res.json();

    setData(info);
    setIsLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(url, controller).catch((error) => {
      console.error(error);
    });
    return () => {
      controller.abort();
    };
  }, [url, searchIngredient]);
  const ingredients = watchIngredient('ingredients');

  const chooseIngredient = (ingredient: Pick<Ingredient, 'name' | 'id'>) => {
    if (ingredients === undefined) {
      setValue('ingredients[0]' as keyof CocktailForm, ingredient);
      setActualIngredient(actualIngredient + 1);
      setIsModalShown(false);
    } else if (
      ingredients !== undefined &&
      ingredients[0] !== undefined &&
      ingredients[1] === undefined &&
      ingredients[2] === undefined
    ) {
      setValue('ingredients[1]' as keyof CocktailForm, ingredient);
      setActualIngredient(actualIngredient + 1);
      setIsModalShown(false);
    } else if (
      ingredients !== undefined &&
      ingredients[0] !== undefined &&
      ingredients[1] !== undefined &&
      ingredients[2] === undefined
    ) {
      setValue('ingredients[2]' as keyof CocktailForm, ingredient);
      setActualIngredient(actualIngredient + 1);
      setShow(5);
      setIsModalShown(false);
    }
  };

  return (
    <div className='fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-50 shadow-md'>
      <div className='flex h-[497px] w-[90%] max-w-[900px] flex-col gap-3 sm:mt-[20rem] sm:w-[75%]'>
        <div className='flex items-center'>
          <div className='flex h-[75px] w-[100%] max-w-[900px] items-center border-[6px] border-black bg-white text-black'>
            <form className='flex h-[100%] w-[100%] items-center'>
              <Search size={40} />
              <input
                className='ml-2 h-[100%] w-[100%] border-none outline-none'
                {...register('searchIngredient', { required: true })}
              />
            </form>
          </div>
          <button
            type='button'
            className='font-stroke text-light hover:text-dark-purple duration-250 ml-5 flex h-[10px] w-[10px] justify-end transition-transform ease-in-out hover:scale-110'
            onClick={() => {
              setIsModalShown(false);
            }}
          >
            <div className='items-center'>{'X'}</div>
          </button>
        </div>
        <div className='pr-[30px]'>
          {watch('searchIngredient') !== undefined &&
          watch('searchIngredient').length === 0 ? null : (
            <div className='flex max-h-[350px] min-h-[120px] w-[100%] max-w-[900px] overflow-y-scroll border-[6px] border-black bg-white text-black'>
              <ul>
                {isLoading
                  ? null
                  : data?.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        onClick={() => {
                          chooseIngredient(ingredient);
                        }}
                      >
                        {ingredient.name}
                      </li>
                    ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
