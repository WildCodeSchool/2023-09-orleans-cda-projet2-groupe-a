import { useEffect, useState } from 'react';

import VirginCocktailCard from '@/components/cocktail-detail/VirginCocktailCard';

export type VirginCocktail = {
  id: number;
  virginCocktail: VirginCocktail;
  name: string;
  description: string;
};

export default function VirginCocktails() {
  const [virginCocktails, setVirginCocktails] = useState<VirginCocktail[]>([]);

  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/virgin`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch virgin cocktails: ${response.statusText}`,
          );
        }
        const data = await response.json();
        setVirginCocktails(data.virginCocktails);
      } catch (error) {
        console.error('Failed to retrieve any coktail:', error);
      }
    };

    fetchCocktails().catch((error) => {
      error;
    });
  }, []);

  return (
    <div
      className='z-20 min-h-screen w-screen grid-flow-row bg-cover p-5'
      style={{ backgroundImage: `url('/bg-virgin.svg')` }}
    >
      <div className='bg-card-virgin-orange border-light-orange flex h-full w-full justify-center rounded-lg border-4 p-3 shadow-2xl sm:w-[70vw] md:h-[13rem] md:w-[27rem]'>
        <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] ps-5 text-center text-4xl text-[2.5rem] font-extrabold uppercase'>
          {'Virgin'}
        </h1>
        <div
          className='z-50 h-[200px] w-[350px] bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('/feeding-bottle-cocktails-2.svg')`,
          }}
        />
      </div>
      <div className='px-10'>
        <div className=' flex flex-col items-center justify-center gap-y-10 md:my-5 md:grid md:grid-cols-2 md:flex-row lg:grid-cols-3 xl:grid-cols-4 2xl:px-20'>
          {virginCocktails.length > 0 &&
            virginCocktails.map((cocktail, index) => (
              <div key={index} className='pb-[22rem]'>
                <VirginCocktailCard
                  id={cocktail.id}
                  name={cocktail.name}
                  description={cocktail.description}
                  virginCocktail={cocktail}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
