import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import type { Cocktail } from '@app/types';

export default function SimilarCocktail() {
  const { id } = useParams();
  const [similarCocktails, setSimilarCocktails] = useState<
    Cocktail[] | undefined
  >();

  const fetchSimilarCocktails = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setSimilarCocktails(data);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchSimilarCocktails(`/api/cocktail/${id}/suggestion`, signal).catch(
      (error) => {
        console.error(error);
      },
    );

    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <div className='m-10 mb-8 flex flex-wrap justify-center md:justify-between'>
      {similarCocktails?.map((cocktail, index) => (
        <div
          className='transition-transform ease-in-out hover:scale-110 '
          key={cocktail.id}
        >
          <Link to={`/details/${cocktail.id}`}>
            <div
              className={`border-dark mb-12 me-[28px] mt-5 h-[336px] w-[288px] rounded-sm border-[3px] ${
                index % 2 === 0 ? 'bg-pastel-brown' : 'bg-card-blue'
              }`}
            >
              <div
                className={`border-dark relative left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px] ${
                  index % 2 === 0 ? 'bg-card-pink' : 'bg-card-light-green'
                }`}
              >
                <div
                  className={`border-dark relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px]  ${
                    index % 2 === 0 ? 'bg-pastel-yellow' : 'bg-card-dark-green'
                  }`}
                >
                  <img
                    src={`${
                      index % 2 === 0
                        ? '/placeholder-cocktail-virgin.webp'
                        : '/placeholder-cocktail.webp'
                    }`}
                    alt='Cocktail picture'
                    className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                  />
                  <div>
                    <div className='mx-4 mt-3 text-center'>
                      <h1 className='font-stroke text-light text-md pb-2 normal-case'>
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
                            key={cocktail.id}
                            className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat ${
                              index <=
                              Math.floor(Number(cocktail.ratings_average) / 2)
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
          </Link>
        </div>
      ))}
    </div>
  );
}
