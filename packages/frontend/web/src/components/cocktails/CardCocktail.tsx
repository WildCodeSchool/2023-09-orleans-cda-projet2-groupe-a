import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

type CardCocktail = {
  id: number;
  name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
};

interface CardCocktailsProps {
  cocktail_id: number;
  cocktail_name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
  readonly cardCocktails: CardCocktail[] | undefined;
}

export default function CardCocktail() {
  const [cocktails, setCocktails] = useState<
    CardCocktailsProps[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCocktails = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setCocktails(data.cocktailsWithAlcohol);
      setIsLoading(false);
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

  if (cocktails === undefined && !isLoading) {
    return <Navigate to='/' />;
  }

  if (isLoading) {
    return null;
  }
  if (!cocktails) {
    return <Navigate to='/' />;
  }
  return (
    <div className='mb-10 mt-20 flex flex-wrap justify-center p-12'>
      {cocktails.map((cocktail) => (
        <div key={cocktail.cocktail_id} className='m-8'>
          <Link to={`/details/${cocktail.cocktail_id}`}>
            <div
              className={`border-dark ${'bg-card-blue'} mb-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px]`}
            >
              <div className='relative'>
                <div
                  className={`border-dark ${'bg-card-light-green'} absolute left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px]`}
                >
                  <div
                    className={`border-dark ${'bg-card-dark-green'} relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px]`}
                  >
                    <img
                      src={`${'/placeholder-cocktail.webp'}`}
                      alt='Cocktail picture'
                      className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                    />
                    <div>
                      <div className='mx-4 mt-3 text-center'>
                        <h1 className='font-stroke text-light text-md'>
                          {cocktail.cocktail_name}
                        </h1>
                        {/* <p>{`(${cocktail.ingredient_name})`}</p> */}
                      </div>
                      <div className='flex justify-center'>
                        {cocktail.avg_rating === 0 ? (
                          <p className='text-sm font-extralight'>
                            {'not grade yet'}
                          </p>
                        ) : (
                          [1, 2, 3, 4, 5].map((index) => (
                            <div
                              key={index}
                              className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale ${
                                index <= Math.floor(cocktail.avg_rating / 2)
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
  );
}
