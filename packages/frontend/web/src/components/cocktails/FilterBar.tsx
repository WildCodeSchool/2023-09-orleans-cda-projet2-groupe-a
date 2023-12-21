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

type Flavour = {
  cocktail_flavour: string;
  flavour_id: number;
};

type Kcal = {
  cocktail_kcal: number;
  kcal_id: number;
};

type Degree = {
  cocktail_degree: number;
  degree_id: number;
};

type Complexity = {
  cocktail_complexity: number;
  complexity_id: number;
};

export default function FilterBar() {
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [alcohols, setAlcohols] = useState<Alcohol[] | undefined>();
  const [flavours, setFlavours] = useState<Flavour[] | undefined>();
  const [kcals, setKcals] = useState<Kcal[] | undefined>();
  const [degrees, setDegrees] = useState<Degree[] | undefined>();
  const [complexities, setComplexities] = useState<Complexity[] | undefined>();

  // const [openMenus, setOpenMenus] = useState([]);
  // const [selectedValues, setSelectedValues] = useState([]);

  // const handleCheckboxChange = (event) => {
  //   const { value } = event.target;
  //   setSelectedValues((prevSelectedValues) => {
  //     if (prevSelectedValues.includes(value)) {
  //       const updatedValues = prevSelectedValues.filter(
  //         (item) => item !== value,
  //       );
  //     }
  //   });
  // };

  // const handleToggleMenu = (menu) => {
  //   setOpenMenus((prevOpenMenus) => {
  //     if (prevOpenMenus.includes(menu)) {
  //       return prevOpenMenus.filter((item) => item !== menu);
  //     } else {
  //       return [...prevOpenMenus, menu];
  //     }
  //   });
  // };

  // const isMenuOpen = (menu) => openMenus.includes(menu);

  const fetchFilterBar = async (signal: AbortSignal) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/filter`, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setIngredients(data.cocktail.ingredients);
      setAlcohols(data.cocktail.alcohols);
      setFlavours(data.cocktail.flavours);
      setKcals(data.cocktail.kcals);
      setDegrees(data.cocktail.degrees);
      setComplexities(data.cocktail.complexities);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchFilterBar(signal).catch((error) => {
      console.error(error);
    });

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
            <div className='text-[1rem]'>
              <div className='flex justify-center'>
                <div className='font-stroke text-light flex h-[2rem] uppercase'>
                  {`flavour`}

                  <Plus color='#0E0F0F' className='ms-2 h-7 w-7 stroke-[3px]' />
                </div>
              </div>
              <div>
                {flavours?.map((flavour) => (
                  <div key={flavour.flavour_id} className='capitalize'>
                    {flavour.cocktail_flavour}
                  </div>
                ))}
              </div>
            </div>
            <div className='text-[1rem]'>
              <div className='flex justify-center'>
                <div className='font-stroke text-light flex h-[2rem] uppercase'>
                  {`kcal`}

                  <Plus color='#0E0F0F' className='ms-2 h-7 w-7 stroke-[3px]' />
                </div>
              </div>
              <div>
                {kcals?.map((kcal) => (
                  <div key={kcal.kcal_id} className='normal-case'>
                    {kcal.cocktail_kcal}
                  </div>
                ))}
              </div>
            </div>
            <div className='text-[1rem]'>
              <div className='flex justify-center'>
                <div className='font-stroke text-light flex h-[2rem] uppercase'>
                  {`complextiy`}

                  <Plus color='#0E0F0F' className='ms-2 h-7 w-7 stroke-[3px]' />
                </div>
              </div>
              <div>
                {complexities?.map((complexity) => (
                  <div key={complexity.complexity_id} className='normal-case'>
                    {complexity.cocktail_complexity}
                  </div>
                ))}
              </div>
            </div>
            <div className='text-[1rem]'>
              <div className='flex justify-center'>
                <div className='font-stroke text-light flex h-[2rem] uppercase'>
                  {`strength`}

                  <Plus color='#0E0F0F' className='ms-2 h-7 w-7 stroke-[3px]' />
                </div>
              </div>
              <div>
                {degrees?.map((degree) => (
                  <div key={degree.degree_id} className='normal-case'>
                    {degree.cocktail_degree}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
