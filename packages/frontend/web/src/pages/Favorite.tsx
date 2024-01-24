import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { Cocktail } from '@app/types';

import useFetch from '@/hooks/use-fetch';

const url = `${import.meta.env.VITE_API_URL}/favorite/`;

const image = (image: string, total_degree: number) => {
  if (image === null) {
    return total_degree > 0
      ? '/placeholder-cocktail.webp'
      : '/placeholder-cocktail-virgin.webp';
  } else {
    console.log(image);
    return `${import.meta.env.VITE_BACKEND_URL}/${image}`;
  }
};

const removeFavorite = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/favorite/add/${id}}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default function Favorite() {
  const [clickedCocktails, setClickedCocktails] = useState<
    Record<number, boolean>
  >({});

  const navigate = useNavigate();

  const { data } =
    useFetch<
      Pick<
        Cocktail,
        'name' | 'id' | 'image' | 'ratings_average' | 'total_degree'
      >[]
    >(url);

  if (
    data &&
    'message' in data &&
    'ok' in data &&
    data.ok === false &&
    data.message === 'not connected'
  ) {
    navigate('/login');
  }

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('favorite-bg.webp')` }}
    >
      <div
        className='mx-auto flex h-[13rem] w-[90vw] rounded border-[4px] border-[#FEADB3] bg-[#EA2879] bg-cover bg-center shadow-lg sm:w-[70vw] md:h-[13rem] md:w-[27rem]'
        style={{ backgroundImage: `url('/dot-favorite.png')` }}
      >
        <div className='relative h-full w-full'>
          <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] ps-10 text-center text-[2.5rem] font-extrabold uppercase'>{`Favorites`}</h1>
          <div className='flex justify-end'>
            <img
              src='home/home-6.png'
              alt='booze image'
              className='absolute z-20 h-[13rem] sm:h-[13rem] sm:w-[13rem]'
            />
          </div>
        </div>
      </div>
      <div className='px-10'>
        <div className=' flex flex-col items-center justify-center gap-y-10 md:my-5 md:grid md:grid-cols-2 md:flex-row lg:grid-cols-3 xl:grid-cols-4 2xl:px-20'>
          {data === undefined
            ? null
            : data.map((cocktail) => (
                <div key={cocktail.id} className='m-6'>
                  <Link to={`/details/${cocktail.id}`}>
                    <div className='border-dark b-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#F575D1]'>
                      <div className='relative'>
                        <div className='border-dark absolute left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#F57575]'>
                          <div className='border-dark relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#EA2879]'>
                            <img
                              src={'/heart.png'}
                              alt='heart'
                              className={`${
                                clickedCocktails[cocktail.id]
                                  ? 'grayscale'
                                  : 'grayscale-0'
                              } absolute bottom-[0px] right-[5px] h-[40px] w-[40px]`}
                              onClick={async (event) => {
                                event.preventDefault();
                                setClickedCocktails({
                                  ...clickedCocktails,
                                  [cocktail.id]: !clickedCocktails[cocktail.id],
                                });
                                await removeFavorite(cocktail.id);
                              }}
                            />
                            <img
                              src={image(cocktail.image, cocktail.total_degree)}
                              alt='Cocktail picture'
                              className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                            />
                            <div>
                              <div className='mx-4 mt-3 text-center'>
                                <h1 className='font-stroke text-light text-md mb-2'>
                                  {cocktail.name}
                                </h1>
                              </div>
                              <div className='flex justify-center'>
                                {Number(cocktail.ratings_average) === 0 ? (
                                  <p className='text-sm font-extralight'>
                                    {'not grade yet'}
                                  </p>
                                ) : (
                                  [1, 2, 3, 4, 5].map((index) => (
                                    <div
                                      key={index}
                                      className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale ${
                                        index <=
                                        Math.round(
                                          Number(cocktail.ratings_average),
                                        )
                                          ? 'grayscale-0 '
                                          : 'grayscale'
                                      }`}
                                    />
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
