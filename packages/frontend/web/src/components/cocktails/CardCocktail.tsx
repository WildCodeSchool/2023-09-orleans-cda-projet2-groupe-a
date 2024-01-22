import { Link } from 'react-router-dom';

interface CardCocktail {
  cocktail_id: number;
  cocktail_name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
  readonly cardCocktails: CardCocktail[] | undefined;
}
type CardCocktailProps = {
  readonly cocktails: CardCocktail[] | undefined;
};

export default function CardCocktail({ cocktails }: CardCocktailProps) {
  return (
    <div className='mb-2 mt-[0.5rem] flex flex-wrap justify-center'>
      {cocktails?.map((cocktail) => (
        <div key={cocktail.cocktail_id} className='m-6'>
          <Link to={`/details/${cocktail.cocktail_id}`}>
            <div className='border-dark bg-card-blue b-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px]'>
              <div className='relative'>
                <div className='border-dark bg-card-light-green absolute left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px]'>
                  <div className='border-dark bg-card-dark-green relative left-[12px] top-[12px] h-[336px] w-[288px] rounded-sm border-[3px]'>
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
