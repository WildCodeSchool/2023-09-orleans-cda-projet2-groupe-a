import CocktailCard from '@/components/cocktail-detail/CocktailCard';
import{ useState } from 'react';

type Cocktail = {
  cocktail: Cocktail;
  name: string;
  description: string;
  // Ajoutez ici d'autres propriétés si nécessaire
};

export default function VirginCocktails() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);


  // fetch ici le virgin.ts

  // const fetchVirgin async function 
  
  // (params: type) {
    

  // }
  // const response await fetch Virgin('/virgin');

  


  return (
    <div
      className='z-20 flex h-screen w-screen items-start justify-center bg-cover p-5'
      style={{ backgroundImage: `url('/bg-virgin.svg')` }}
    >
      <div className='bg-card-virgin-orange border-light-orange mx-auto flex h-[13rem] w-[90vw] rounded-lg border-4 p-3 shadow-2xl sm:w-[70vw] md:h-[13rem] md:w-[27rem]'>
        <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] ps-5 text-center text-4xl text-[2.5rem] font-extrabold uppercase'>
          {'Virgin'}
        </h1>
        <div
          className='z-50 h-[200px] w-[350px] bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('/feeding-bottle-cocktails-2.svg')`,
          }}
        />
        <div className="flex-1 items-start">
          <CocktailCard />
        </div>
        {/* <div className="justify-items">
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.name} cocktail={cocktail} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
