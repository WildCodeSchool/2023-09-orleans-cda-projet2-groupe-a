import { useEffect, useState } from 'react';

import VirginCocktailCard from '../components/cocktail-detail/VirginCocktailCard';

export type VirginCocktail = {
  id: number;
  virginCocktail: VirginCocktail;
  cocktail_id: number;
  name: string;
  avg_rating: number;
};

interface Data {
  virginCocktails: VirginCocktail[];
}

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
        const data: Data = (await response.json()) as Data;
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
      className='z-20 min-h-screen w-screen grid-flow-row overflow-auto bg-cover p-5'
      style={{ backgroundImage: `url('/bg-virgin.svg')` }}
    >
      <div className='flex h-full w-full items-center justify-center'>
        <div className='bg-card-virgin-orange border-light-orange flex h-full w-full justify-center rounded-lg border-4 p-3 shadow-2xl sm:w-[70vw] md:h-[13rem] md:w-[27rem]'>
          <div className='flex h-full w-full flex-col items-center justify-center sm:ml-[20px]'>
            <h1 className='font-stroke xxs:text-2xl md:font-stroke text-light absolute z-50 m-auto mr-[200px] flex stroke-[2rem] py-[4rem] ps-5 text-center text-[2.5rem] font-extrabold uppercase sm:text-2xl md:text-4xl'>
              {'Virgin'}
            </h1>
            <div
              className='xxs:h-[150px] xs:w-[300px] xxs:ml-[150px] z-50 ml-[250px] h-[200px] w-[350px] bg-center bg-no-repeat'
              style={{
                backgroundImage: `url('/feeding-bottle-cocktails-2.svg')`,
              }}
            />
          </div>
        </div>
      </div>
      <div className='px-10'>
        <div className='xs:text-xl xxs:-ml-[360px] flex flex-col items-center justify-center gap-y-10 sm:-ml-[80px] sm:px-20 md:my-5 md:grid md:grid-cols-2 md:flex-row lg:grid-cols-3 xl:grid-cols-4'>
          {virginCocktails.length > 0 &&
            virginCocktails.map((cocktail, index) => (
              <div key={index} className='pb-[22rem]'>
                <VirginCocktailCard
                  name={cocktail.name}
                  avg_rating={cocktail.avg_rating}
                  virginCocktail={cocktail}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
