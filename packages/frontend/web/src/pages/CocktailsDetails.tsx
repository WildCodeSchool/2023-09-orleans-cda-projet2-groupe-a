import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import type { Cocktail } from '@app/types';

import CocktailCard from '@/components/cocktail-detail/CocktailCard';
import CocktailComments from '@/components/cocktail-detail/CocktailComments';
import CocktailForm from '@/components/cocktail-detail/CocktailForm';
import StarRating from '@/components/cocktail-detail/StarRating';

export default function CocktailsDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCocktails = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setCocktail(data.cocktails);
      setIsLoading(false);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCocktails(
      `${import.meta.env.VITE_API_URL}/cocktail/${id}`,
      signal,
    ).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [id]);

  if (cocktail === undefined && !isLoading) {
    return <Navigate to='/' />;
  }

  return cocktail ? (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-no-repeat lg:p-16'
      style={{ backgroundImage: `url('/bg-details.png')` }}
    >
      <h1 className='font-stroke text-light z-50 mx-5 pt-10 text-center text-[1.6rem] font-extrabold uppercase sm:pt-16 sm:text-start'>
        {cocktail.name}
      </h1>
      <div className='flex flex-col sm:flex-row'>
        <div className='relative h-[30rem] w-[25rem]'>
          <div className='border-dark bg-pastel-yellow absolute left-14 z-50 my-20 h-[21rem] w-[18rem] rounded-sm border-[3px] uppercase'>
            <img
              src='/cocktail-placeholder.png'
              alt='Cocktail picture'
              className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
            />
            <p className='text-md mx-4 mt-5 text-center uppercase'>{`Gin, liqueurs, vermouth`}</p>
          </div>

          <div className='border-dark bg-card-pink absolute -top-3 left-10 z-30 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
          <div className='border-dark bg-pastel-brown absolute -top-6 left-6  m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
        </div>
        <div className='sm:x-[80] pt-16 sm:flex sm:w-[65%] sm:flex-col'>
          <CocktailForm cocktail={cocktail} />
          <div className='border-dark bg-pastel-green m-auto my-20 h-[21rem] w-[80%] rounded-sm border-[3px] uppercase sm:my-0 sm:mt-14 md:mt-0'>
            <h3 className='m-4 uppercase'>{`tools`}</h3>
          </div>
          <div className='border-dark bg-pastel-pink m-auto mt-20 h-[21rem] w-[80%] rounded-sm border-[3px] uppercase'>
            <h3 className='m-4 uppercase'>{`ingredients`}</h3>
          </div>
          <div className='border-dark bg-pastel-beige m-auto my-20 h-[21rem] w-[80%] rounded-sm border-[3px] uppercase'>
            <h3 className='m-4 uppercase'>{`steps`}</h3>
          </div>
        </div>
      </div>
      <h2 className='font-stroke text-light mx-5 pb-16 text-center text-[1.6rem] font-extrabold uppercase sm:text-start'>{`Cocktail's name`}</h2>
      <CocktailComments />
      <h2 className='font-stroke text-light mb-20 flex px-2 text-center text-[1.4rem] font-extrabold uppercase'>{`you're going to love them !`}</h2>

      <div className='border-dark bg-pastel-pink relative m-auto mb-20 hidden h-[26rem] w-[90%] rounded-sm border-[3px] uppercase sm:block sm:flex-wrap'>
        <CocktailCard />
      </div>
      {/* card swipper */}
      <div className='relative left-10 mb-20 sm:hidden'>
        <div className='border-dark bg-card-pink-dark absolute m-auto mb-20 h-[21rem] w-[18rem] -rotate-3 rounded-sm border-[3px] uppercase'>
          <img
            src='/cocktail-placeholder.png'
            alt='Cocktail picture'
            className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
          />
          <div>
            <p className='font-stroke text-light text-md mx-4 mt-3 text-center'>{`Cocktail's name`}</p>
            <div className='mt-2 flex justify-center'>
              <StarRating starCount={5} />
            </div>
          </div>
        </div>
        <div className='border-dark bg-card-green absolute m-auto mb-20 h-[21rem] w-[18rem] rounded-sm border-[3px] uppercase'>
          <img
            src='/cocktail-placeholder.png'
            alt='Cocktail picture'
            className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
          />
          <div>
            <p className='font-stroke text-light text-md mx-4 mt-3 text-center'>{`Cocktail's name`}</p>
            <div className='mt-2 flex justify-center'>
              <StarRating starCount={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : undefined;
}
