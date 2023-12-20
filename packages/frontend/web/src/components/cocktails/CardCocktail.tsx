type CardCocktail = {
  cocktail_id: number;
  avg_rating: number;
  cocktail_name: string;
  ingredient_name: string;
  family: string;
};
interface CardCocktailsProps {
  readonly cocktails: CardCocktail[];
}
export default function CardCocktail({ cocktails }: CardCocktailsProps) {
  return (
    <div className=''>
      {cocktails.map((cocktail) => (
        <div
          key={cocktail.cocktail_id}
          className='absolute mb-10 flex h-full w-full items-center justify-center md:static'
        >
          <div
            className={`border-dark ${'bg-card-blue'} mb-6 me-[28px] h-[336px] w-[288px] rounded-sm border-[3px]`}
          >
            <div
              className={`border-dark ${'bg-card-light-green'} relative left-[11px] top-[11px] h-[336px] w-[288px] rounded-sm border-[3px]`}
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
        </div>
      ))}
    </div>
  );
}
