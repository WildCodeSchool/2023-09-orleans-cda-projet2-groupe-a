import { useEffect, useState } from 'react';

import VirginCocktailCard from '../components/VirginCocktailCard';

export type VirginCocktail = {
  id: number;
  virginCocktail: VirginCocktail;
  cocktail_id: number;
  name: string;
  avg_rating: number;
  is_favorite: number;
};

interface Data {
  virginCocktails: VirginCocktail[];
}

export default function VirginCocktails() {
  const [virginCocktails, setVirginCocktails] = useState<VirginCocktail[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchCocktails = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/virgin`, {
          signal,
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch virgin cocktails: ${response.statusText}`,
          );
        }
        const data: Data = (await response.json()) as Data;
        setVirginCocktails(data.virginCocktails);
      } catch (error) {
        console.error('Failed to retrieve any coktail:', error);
      }
    };

    fetchCocktails().catch(() => {});

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('/bg-virgin.svg')` }}
    >
      <div
        className='shadow-card-cocktail bg-card-virgin-orange mx-auto mb-10 flex h-[13rem] w-[90vw] rounded border-[4px] border-[#F5A975] bg-cover bg-center shadow-lg transition-transform ease-in-out hover:scale-110 sm:w-[70vw] md:h-[12.5rem] md:w-[24rem]'
        style={{ backgroundImage: `url('green-dot.png')` }}
      >
        <div className='relative h-full w-full'>
          <h1 className='font-stroke text-light absolute left-5 z-50 m-auto flex stroke-[2rem] py-[4rem] ps-7 text-center text-[2.5rem] font-extrabold uppercase'>{`Virgin`}</h1>
          <div className='flex justify-end'>
            <img
              src='/home/home-4.png'
              alt='Feeding bottle'
              className='absolute z-20 h-[13rem] sm:h-[13rem] sm:w-[12rem]'
            />
          </div>
        </div>
      </div>
      <div className='sm:scrollbar-bigger-rounded mb-8 mt-[0.5rem] flex h-[65vh] flex-wrap justify-center overflow-x-hidden sm:overflow-y-scroll'>
        <div className='flex flex-col items-center justify-center gap-y-10 md:my-5 md:grid md:grid-cols-2 md:flex-row lg:grid-cols-3 xl:grid-cols-4 2xl:px-20'>
          {virginCocktails.length > 0 &&
            virginCocktails.map((cocktail) => (
              <div key={cocktail.id} className='m-6'>
                <VirginCocktailCard
                  name={cocktail.name}
                  avg_rating={cocktail.avg_rating}
                  virginCocktail={cocktail}
                  is_favorite={cocktail.is_favorite}
                  cocktail_id={cocktail.id}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
