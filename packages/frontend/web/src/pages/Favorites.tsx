import { Link, useNavigate } from 'react-router-dom';

import type { Cocktail } from '@app/types';

import FavoriteHeart from '@/components/FavoriteHeart';
import Stars from '@/components/favorite/Stars';
import Title from '@/components/favorite/Title';
import useFetch from '@/hooks/use-fetch';

type Data = {
  ok?: boolean;
  message?: string;
  cocktails?: Pick<
    Cocktail,
    'name' | 'id' | 'image' | 'ratings_average' | 'total_degree'
  >[];
};

const url = `/api/favorite/`;

const image = (image: string | undefined, total_degree: number) => {
  if (image === null) {
    return total_degree > 0
      ? '/placeholder-cocktail.webp'
      : '/placeholder-cocktail-virgin.webp';
  } else {
    return `${import.meta.env.VITE_BACKEND_URL}/${image}`;
  }
};

export default function Favorite() {
  const navigate = useNavigate();

  const { data } = useFetch<Data>(url);
  if (data !== undefined && !data.ok && data.message === 'not connected') {
    navigate('/login');
  }

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('favorites-bg.webp')` }}
    >
      <Title />
      <div className='px-10'>
        <div className='flex flex-col items-center justify-center gap-y-10 md:my-5 md:grid md:grid-cols-2 md:flex-row lg:grid-cols-3 xl:grid-cols-4 2xl:px-20'>
          {data === undefined || data.cocktails === undefined
            ? null
            : data.cocktails.map((cocktail) => (
                <div key={cocktail.id} className='m-6'>
                  <Link to={`/details/${cocktail.id}`}>
                    <div className='border-dark b-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#F575D1]'>
                      <div className='relative'>
                        <div className='border-dark absolute left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#F57575]'>
                          <div className='border-dark relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px] bg-[#EA2879]'>
                            <FavoriteHeart id={cocktail.id} isFavorite={1} />
                            <img
                              src={image(cocktail.image, cocktail.total_degree)}
                              alt='Cocktail picture'
                              className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                            />
                            <div>
                              <div className='mx-4 mt-3 text-center'>
                                <h1 className='font-stroke text-light text-md mb-2'>
                                  {cocktail.name}
                                </h1>
                              </div>
                              <Stars
                                ratings_average={cocktail.ratings_average}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
