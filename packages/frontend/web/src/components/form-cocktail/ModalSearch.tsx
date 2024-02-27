import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import type { CocktailForm, Ingredient } from '@app/types';

interface ModalSearchProps {
  readonly setIsModalShown: (isModalShown: boolean) => void;
  readonly actualIngredient: number;
  readonly setActualIngredient: (actualIngredient: number) => void;
}

interface SearchIngredient {
  readonly searchIngredient: string;
}

export default function ModalSearch({
  setIsModalShown,
  actualIngredient,
  setActualIngredient,
}: ModalSearchProps) {
  const { setValue } = useFormContext();
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

  const chooseIngredient = (ingredient: Pick<Ingredient, 'name' | 'id'>) => {
    setIsModalShown(false);
    setValue(
      `ingredients[${actualIngredient}]` as keyof CocktailForm,
      ingredient,
    );
    setActualIngredient(actualIngredient + 1);
  };

  return (
    <div className='fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-50 shadow-md'>
      <button
        type='button'
        className='font-stroke text-light hover:text-dark-purple duration-250 mt-[15rem] flex justify-center transition-transform ease-in-out hover:scale-110'
        onClick={() => {
          setIsModalShown(false);
        }}
      >
        <div className='flex w-[5rem] items-center justify-center text-2xl'>
          {'X'}
        </div>
      </button>
      <div className='mt-[2rem] flex h-[497px] w-[90%] max-w-[800px] flex-col gap-3 sm:w-[75%]'>
        <div className='flex items-center'>
          <div className='flex h-[60px] w-[100%] max-w-[900px] items-center rounded-lg border-[5px] border-black bg-white text-black'>
            <form className='flex h-[100%] w-[100%] items-center'>
              <Search className='ps-4' size={50} />
              <input
                className='ml-2 h-[100%] w-[100%] border-none outline-none'
                {...register('searchIngredient', { required: true })}
              />
            </form>
          </div>
        </div>

        <div>
          {watch('searchIngredient') !== undefined &&
          watch('searchIngredient').length === 0 ? null : (
            <div className='flex max-h-[350px] min-h-[50px] w-[100%]  rounded-lg border-[5px] border-black bg-white pe-2 text-black'>
              <div className='scrollbar-bigger-rounded w-full overflow-y-scroll'>
                <ul className='grid w-full grid-cols-3 p-6 '>
                  {isLoading
                    ? null
                    : data?.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          onClick={() => {
                            chooseIngredient(ingredient);
                          }}
                          className='mx-auto cursor-pointer pb-2'
                        >
                          {ingredient.name}
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
