import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import type { VirginCocktail } from '../../pages/Virgin';
import FavoriteHeart from '../FavoriteHeart';

type CocktailCardProps = {
  readonly virginCocktail: VirginCocktail;
  readonly name: string;
  readonly avg_rating: number;
  readonly is_favorite: number;
  readonly cocktail_id: number;
};
export default function VirginCocktailCard({
  name,
  avg_rating,
  virginCocktail,
  is_favorite,
  cocktail_id,
}: CocktailCardProps) {
  const { isLoggedIn } = useAuth();
  if (!virginCocktail) {
    return null;
  }

  return (
    <div className='relative -top-8'>
      <Link to={`/details/${virginCocktail.id}`}>
        <div className='border-dark bg-card-pink absolute -top-3 left-10 z-30 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
        <div className='border-dark bg-pastel-brown absolute -top-6 left-6 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
        <div className='border-dark bg-card-pink-dark absolute left-14 z-[50] my-20 h-[21rem] w-[18rem] rounded-sm border-[3px] normal-case'>
          {isLoggedIn ? (
            <FavoriteHeart id={cocktail_id} isFavorite={is_favorite} />
          ) : null}
          <img
            src='/cocktail-placeholder.png'
            alt='Cocktail picture'
            className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
          />
          <div>
            <p className='font-stroke text-light text-md mx-4 mt-3 text-center'>
              {name}
            </p>
            <div className='flex justify-center py-3'>
              {avg_rating === 0 ? (
                <p className='text-sm font-extralight'>{'not grade yet'}</p>
              ) : (
                [1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat ${
                      index <= Math.floor(avg_rating / 2)
                        ? 'grayscale-0'
                        : 'grayscale'
                    }`}
                  />
                ))
              )}
            </div>
            <div className='mt-2 flex justify-center' />
          </div>
        </div>
      </Link>
    </div>
  );
}
