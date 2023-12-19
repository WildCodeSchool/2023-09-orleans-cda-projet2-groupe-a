import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { CocktailForm, Ingredient } from '@app/types';

interface ModalSearchProps {
  readonly setIsModalShown: (isModalShown: boolean) => void;
  readonly setValue: (
    name: keyof CocktailForm,
    value: string | { id: number; name: string },
  ) => void;
}

interface SearchIngredient {
  readonly searchIngredient: string;
}

const onSubmit: SubmitHandler<SearchIngredient> = (data) => {
  console.log(data);
  return data;
};

export default function ModalSearch({
  setIsModalShown,
  setValue,
}: ModalSearchProps) {
  const { register, handleSubmit, watch } = useForm<SearchIngredient>();
  const [data, setData] = useState<Pick<Ingredient, 'name' | 'id'>[]>();
  const [isLoading, setIsLoading] = useState(true);

  const url = `${import.meta.env.VITE_API_URL}/ingredient/search/${watch(
    'searchIngredient',
  )}`;

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
  }, [watch('searchIngredient')]);

  const chooseIngredient = (ingredient: Pick<Ingredient, 'name' | 'id'>) => {
    setValue('ingredient2', ingredient);
  };

  return (
    <div className='fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-50 shadow-md'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center'>
          <div className='flex h-[75px] w-[900px] items-center border-[6px] border-black bg-white text-black'>
            <form
              className='flex items-center'
              onSubmit={handleSubmit(onSubmit)}
            >
              <button type='submit'>
                <Search size={40} />
              </button>
              <input
                className='ml-2 h-[50px] w-[800px]'
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
        {watch('searchIngredient') !== undefined &&
        watch('searchIngredient').length === 0 ? null : (
          <div className='flex max-h-[350px] min-h-[120px] w-[900px] overflow-y-scroll border-[6px] border-black bg-white text-black'>
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
  );
}
