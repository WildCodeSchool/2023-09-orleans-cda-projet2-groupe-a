import { Link } from 'react-router-dom';

import type { CocktailsProfile } from '@app/types';

import { useAuth } from '@/contexts/AuthContext';

import FavoriteHeart from '../FavoriteHeart';

interface CocktailProfileProps {
  readonly cocktails: CocktailsProfile[];
}

export default function Card({ cocktails }: CocktailProfileProps) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {cocktails.map((cocktail) => (
        <div
          key={cocktail.cocktail_id}
          className='absolute mb-10 flex h-full w-full items-center justify-center md:static'
        >
          <Link to={`/details/${cocktail.cocktail_id}`}>
            <div
              className={`border-dark ${
                cocktail.family === 'alcohol'
                  ? 'bg-card-blue'
                  : 'bg-card-virgin-pink'
              } mb-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px]`}
            >
              <div
                className={`border-dark ${
                  cocktail.family === 'alcohol'
                    ? 'bg-card-light-green'
                    : 'bg-card-virgin-dark-pink'
                } relative left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px]`}
              >
                <div
                  className={`border-dark ${
                    cocktail.family === 'alcohol'
                      ? 'bg-card-dark-green'
                      : 'bg-card-virgin-salmon'
                  } relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px]`}
                >
                  {isLoggedIn ? (
                    <FavoriteHeart
                      id={cocktail.cocktail_id}
                      isFavorite={cocktail.is_favorite}
                    />
                  ) : null}
                  <img
                    src={`${
                      cocktail.family === 'alcohol'
                        ? '/placeholder-cocktail.webp'
                        : '/placeholder-cocktail-virgin.webp'
                    }`}
                    alt='Cocktail picture'
                    className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                  />
                  <div>
                    <div className='mx-4 mt-3 text-center'>
                      <h1 className='font-stroke text-light text-md'>
                        {cocktail.cocktail_name}
                      </h1>
                      <p>{`(${cocktail.ingredient_name})`}</p>
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
          </Link>
        </div>
      ))}
    </>
  );
}
