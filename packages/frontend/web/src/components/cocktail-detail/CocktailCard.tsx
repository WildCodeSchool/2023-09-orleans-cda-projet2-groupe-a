import type { VirginCocktail } from '@/pages/Virgin';

type CocktailCardProps = {
  readonly id: number;
  readonly virginCocktail: VirginCocktail;
  readonly name: string;
  readonly description: string;
};

export default function CocktailCard({
  id,
  virginCocktail,
  name,
  description,
}: CocktailCardProps) {
  return (
    <div className='relative -top-8'>
      <div className='border-dark bg-card-pink absolute -top-3 left-10 z-30 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
      <div className='border-dark bg-pastel-brown absolute -top-6 left-6 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
      <div className='border-dark bg-card-pink-dark absolute left-14 z-[50] my-20 h-[21rem] w-[18rem] rounded-sm border-[3px] uppercase'>
        <img
          src='/cocktail-placeholder.png'
          alt='Cocktail picture'
          className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
        />
        <div>
          <p className='font-stroke text-light text-md mx-4 mt-3 text-center'>
            {name}
          </p>
          <p>{description}</p>
          <p>{virginCocktail.name}</p>
          <p>{id}</p>
          <div className='mt-2 flex justify-center' />
        </div>
      </div>
    </div>
  );
}
