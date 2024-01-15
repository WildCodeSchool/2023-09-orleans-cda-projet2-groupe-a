import { useEffect, useState } from 'react';

import CocktailCard from '@/components/cocktail-detail/CocktailCard';

export type VirginCocktail = {
  virginCocktail: VirginCocktail;
  name: string;
  description: string;
  // Ajoutez ici d'autres propriétés si nécessaire
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
        setVirginCocktails(data);
        console.log(data.virginCocktails);
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
      className='z-20 flex h-screen w-screen items-start justify-center bg-cover p-5'
      style={{ backgroundImage: `url('/bg-virgin.svg')` }}
    >
      <div className='bg-card-virgin-orange border-light-orange mx-auto flex h-[13rem] w-[90vw] rounded-lg border-4 p-3 shadow-2xl sm:w-[70vw] md:h-[13rem] md:w-[27rem]'>
        <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] ps-5 text-center text-4xl text-[2.5rem] font-extrabold uppercase'>
          {'Virgin'}
        </h1>
        <div
          className='z-50 h-[200px] w-[350px] bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('/feeding-bottle-cocktails-2.svg')`,
          }}
        />
        {/* <div className='flex-1 items-start'>
          <CocktailCard />
        </div> */}
        <div className='justify-items'>
          {Array.isArray(virginCocktails) &&
            virginCocktails.map((virginCocktail) => (
              <CocktailCard
                key={virginCocktail.name}
                // virginCocktail={virginCocktail}
                // name={virginCocktail.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
