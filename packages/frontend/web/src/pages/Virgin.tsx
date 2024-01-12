import React from 'react';
import { useEffect, useState } from 'react';

export default function VirginCocktails() {
  const [cocktails, setCocktails] = useState([]);

  type Cocktail = {
    name: string;
    description: string;
    // Ajoutez ici d'autres propriétés si nécessaire
  };

  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      try {
        const response = await fetch('/virgin'); // Remplacez ceci par l'URL de votre API
        const data = await response.json();
        setCocktails(data.virginCocktails);
      } catch (error) {
        console.error('Failed to fetch cocktails:', error);
      }
    };

    fetchCocktails().catch((error) => {
      console.error('Failed to fetch cocktails:', error);
    });
  }, []);

  return (
    <>
      <div>
        <h1>{'Virgin Cocktails'}</h1>
        {cocktails.map((cocktail) => (
          <div key={cocktail}>
            {/* <h2>{cocktail.name}</h2> */}
            <p>{'cocktail.description'}</p>
            {/* Ajoutez ici d'autres détails sur le cocktail */}
          </div>
        ))}
      </div>
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
        </div>
      </div>
    </>
  );
}
