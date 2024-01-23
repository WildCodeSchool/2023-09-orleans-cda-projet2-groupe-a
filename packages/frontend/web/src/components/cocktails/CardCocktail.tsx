import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CardCocktail {
  cocktail_id: number;
  cocktail_name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
  is_favorite?: number;
  readonly cardCocktails: CardCocktail[] | undefined;
}
type CardCocktailProps = {
  readonly cocktails: CardCocktail[] | undefined;
};

const removeFavorite = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/favorite/add/${id}}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    await response.json();
  } catch (error) {
    console.error(error);
  }
};

export default function CardCocktail({ cocktails }: CardCocktailProps) {
  const [clickedCocktails, setClickedCocktails] = useState<
    Record<number, boolean>
  >({});

  return (
    <div className='mb-2 mt-[0.5rem] flex flex-wrap justify-center'>
      {cocktails?.map((cocktail) => (
        <div key={cocktail.cocktail_id} className='m-6'>
          <Link to={`/details/${cocktail.cocktail_id}`}>
            <div className='border-dark bg-card-blue b-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px]'>
              <div className='relative'>
                <div className='border-dark bg-card-light-green absolute left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px]'>
                  <div className='border-dark bg-card-dark-green relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px]'>
                    {cocktail.is_favorite === undefined ? null : (
                      <img
                        src={'/heart.png'}
                        alt='heart'
                        className={`${
                          clickedCocktails[cocktail.cocktail_id] ||
                          (cocktail.is_favorite === 1 &&
                            clickedCocktails[cocktail.cocktail_id] ===
                              undefined) ||
                          clickedCocktails[cocktail.cocktail_id]
                            ? 'grayscale-0'
                            : 'grayscale'
                        } absolute bottom-[0px] right-[5px] h-[40px] w-[40px]`}
                        onClick={async (event) => {
                          event.preventDefault();
                          setClickedCocktails({
                            ...clickedCocktails,
                            [cocktail.cocktail_id]:
                              !clickedCocktails[cocktail.cocktail_id],
                          });
                          await removeFavorite(cocktail.cocktail_id);
                        }}
                      />
                    )}
                    <img
                      src={`${'/placeholder-cocktail.webp'}`}
                      alt='Cocktail picture'
                      className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
                    />
                    <div>
                      <div className='mx-4 mt-3 text-center'>
                        <h1 className='font-stroke text-light text-md mb-2'>
                          {cocktail.cocktail_name}
                        </h1>
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
                              className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat ${
                                index <= Math.floor(cocktail.avg_rating / 2)
                                  ? 'grayscale-0'
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
