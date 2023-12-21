import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

type Alcohol = {
  alcohol_name: string;
  alcohol_id: number;
};

type Ingredient = {
  ingredient_name: string;
  ingredient_id: number;
};

export default function FilterBar() {
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [alcohols, setAlcohols] = useState<Alcohol[] | undefined>();

  // const [isLoading, setIsLoading] = useState(true);

  const fetchFilterBar = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setIngredients(data.cocktail.ingredients);
      setAlcohols(data.cocktail.alcohols);
      // console.log(data.cocktail.alcohols);

      // setIsLoading(false);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchFilterBar(`${import.meta.env.VITE_API_URL}/filter`, signal).catch(
      (error) => {
        console.error(error);
      },
    );

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className='mt-12'>
      <p className='font-stroke text-light ps-[5rem] text-[1.2rem] uppercase'>{`filter by`}</p>
      <div className='mt-10 flex justify-center'>
        <div className='border-dark bg-card-green mx-auto w-[95vw] rounded-sm border-[3px] p-8 uppercase'>
          <div className='grid h-full w-full grid-cols-7 grid-rows-1 gap-2'>
            <div className='text-[1rem]'>
              <div className='flex justify-center'>
                <div className='font-stroke text-light flex h-[2rem] uppercase'>
                  {`alcohol`}

                  <Plus color='#0E0F0F' className='ms-2 h-7 w-7 stroke-[3px]' />
                </div>
              </div>
              <div>
                {alcohols?.map((alcohol) => (
                  <div key={alcohol.alcohol_id} className='normal-case'>
                    {alcohol.alcohol_name}
                  </div>
                ))}
              </div>
            </div>
            <div className='text-[1rem]'>
              <div className='flex justify-center'>
                <div className='font-stroke text-light flex h-[2rem] uppercase'>
                  {`ingredients`}

                  <Plus color='#0E0F0F' className='ms-2 h-7 w-7 stroke-[3px]' />
                </div>
              </div>
              <div>
                {ingredients?.map((ingredient) => (
                  <div key={ingredient.ingredient_id} className='normal-case'>
                    {ingredient.ingredient_name}
                  </div>
                ))}
              </div>
            </div>

            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`rank`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`flavour`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`kcal`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 flex h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`complexity`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
            <div className='font-stroke text-light flex justify-center text-[1rem] uppercase'>
              {`strength`}
              <div>
                <Plus
                  color='#0E0F0F'
                  className='my-auto ms-2 h-7 w-7 stroke-[3px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
