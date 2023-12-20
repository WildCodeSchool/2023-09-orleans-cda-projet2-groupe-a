import { useEffect, useState } from 'react';

// import { Navigate } from 'react-router-dom';
import type { Cocktail } from '@app/types';

// import CardCocktail from '@/components/cocktails/CardCocktail';
import CardTitle from '@/components/cocktails/CardTitle';

// import FilterBar from '@/components/cocktails/FilterBar';

export default function Cocktails() {
  const [cocktail, setCocktail] = useState<Cocktail[] | undefined>();
  // const [isLoading, setIsLoading] = useState(true);

  const fetchCocktails = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setCocktail(data.cocktailsWithAlcohol);
      // console.log(data.cocktailsWithAlcohol);
      // setIsLoading(false);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCocktails(
      `${import.meta.env.VITE_API_URL}/cocktail/alcohol`,
      signal,
    ).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, []);

  // if (cocktail === undefined && !isLoading) {
  //   return <Navigate to='/' />;
  // }

  // if (isLoading) {
  //   return null;
  // }
  // if (!cocktail) {
  //   return <Navigate to='/' />;
  // }

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('bg-cocktails.png')` }}
    >
      <CardTitle />
      {/* <FilterBar /> */}
      {/* <CardCocktail /> */}
    </div>
  );
}
