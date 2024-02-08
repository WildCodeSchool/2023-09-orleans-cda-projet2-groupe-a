import { Pencil } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import type { Cocktail } from '@app/types';

import CocktailComments from '@/components/cocktail-detail/CocktailComments';
import CocktailForm from '@/components/cocktail-detail/CocktailForm';
import FireLevel from '@/components/cocktail-detail/FireLevel';
import SimilarCocktail from '@/components/cocktail-detail/SimilarCocktail';

type Topping = {
  topping_id: number;
  topping_name: string;
  topping_quantity: number;
};

type Tool = {
  tool_id: number;
  tool_name: string;
  tool_image: string;
};

type Ingredient = {
  ingredient_id: number;
  ingredient_name: string;
  quantity: number;
  verb: string;
  priority: number;
};

export default function CocktailsDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState<Cocktail | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [toppings, setToppings] = useState<Topping[] | undefined>();
  const [tools, setTools] = useState<Tool[] | undefined>();
  const location = useLocation();
  const [actualLocation, setActualLocation] = useState(location.pathname);
  const [isLoading, setIsLoading] = useState(true);
  const topDetailsPage = useRef<HTMLHeadingElement>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const fetchCocktails = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setCocktail(data.cocktail);
      setIngredients(data.cocktail.ingredients);
      setToppings(data.cocktail.toppings);
      setTools(data.cocktail.tools);
      setIsLoading(false);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCocktails(`/api/cocktail/${id}`, signal).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [id, isFormVisible]);

  useEffect(() => {
    if (actualLocation !== location.pathname) {
      topDetailsPage.current?.scrollIntoView({ behavior: 'smooth' });

      setActualLocation(location.pathname);
    }
  }, [location.pathname, actualLocation]);

  if (cocktail === undefined && !isLoading) {
    return <Navigate to='/' />;
  }

  if (isLoading) {
    return null;
  }
  if (!cocktail) {
    return <Navigate to='/' />;
  }

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-no-repeat lg:p-16'
      style={{ backgroundImage: `url('/bg-details.png')` }}
    >
      <h1
        ref={topDetailsPage}
        className='font-stroke text-light z-50 mx-5 pt-16 text-center text-[1.6rem] font-extrabold uppercase sm:text-start md:ps-4 lg:ps-10 xl:ps-10'
      >
        {cocktail.name}
        <button onClick={toggleForm} type='submit'>
          <Pencil
            size={38}
            stroke='#8A741F'
            className='ms-4 inline-block transition-transform ease-in-out hover:scale-110'
          />
        </button>
      </h1>
      <FireLevel totalDegree={cocktail.total_degree} />
      <div className='flex flex-col justify-center md:flex-row'>
        <div className='relative m-auto h-[30rem] w-[25rem] transition-transform ease-in-out hover:scale-110 sm:m-0'>
          <div className='border-dark bg-pastel-yellow absolute -top-4 left-14 z-50 my-20 h-[21rem] w-[18rem] rounded-sm border-[3px] uppercase'>
            <img
              src={
                cocktail.image
                  ? `${import.meta.env.VITE_BACKEND_URL}/${cocktail.image}`
                  : '/cocktail-placeholder.png'
              }
              alt='Cocktail picture'
              className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
            />
            <div className='flex max-h-[4.3rem] flex-wrap justify-center truncate px-5 pt-4'>
              {ingredients?.map((ingredient, index) => (
                <div key={ingredient.ingredient_name}>
                  <p className='text-md me-1 uppercase'>
                    {ingredient.ingredient_name}
                    {index < ingredients.length - 1 && `, `}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className='border-dark bg-card-pink absolute -top-8 left-10 z-30 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
          <div className='border-dark bg-pastel-brown absolute -top-12 left-6  m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
        </div>
        <div className='sm:x-[80] sm:scrollbar-bigger-rounded sm:flex sm:h-[800px] sm:w-[65%] sm:flex-col sm:overflow-y-scroll'>
          <CocktailForm
            cocktail={cocktail}
            isFormVisible={isFormVisible}
            setIsFormVisible={setIsFormVisible}
          />
          <div className='border-dark bg-pastel-green m-auto my-20 w-[80%] rounded-sm border-[3px] sm:my-0 sm:mt-14 md:mt-0'>
            <h3 className='m-4 ms-8 mt-8 uppercase'>{`tools`}</h3>
            <div className='flex-row px-5 pb-5 leading-10'>
              {tools?.map((tool) => (
                <ul key={tool.tool_name}>
                  <li className='flex'>
                    <p className='ms-4'>{tool.tool_image}</p>
                    <p className='ms-4'>{tool.tool_name}</p>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className='border-dark bg-pastel-pink m-auto mt-20 w-[80%] rounded-sm border-[3px]'>
            <h3 className='m-4 ms-8 mt-8 uppercase'>{`ingredients`}</h3>
            <div className='flex-row px-5 pb-5 leading-10'>
              {ingredients?.map((ingredient) => (
                <ul key={ingredient.ingredient_name}>
                  <li className='ms-4 flex'>
                    <p className='ms-4'>{`. ${ingredient.quantity}`}</p>
                    <p className='ms-4'>{ingredient.ingredient_name}</p>
                  </li>
                </ul>
              ))}
              <h4 className='mt-3'>{`Garnish :`}</h4>
              <div>
                {toppings?.map((topping) => (
                  <ul key={topping.topping_name}>
                    <li className='ms-4 flex'>
                      <p className='ms-4'>{`. ${topping.topping_quantity}`}</p>
                      <p className='ms-4'>{topping.topping_name}</p>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <div className='border-dark bg-pastel-beige m-auto my-20 w-[80%] rounded-sm border-[3px]'>
            <h3 className='m-4 ms-8 mt-8 uppercase'>{`steps`}</h3>
            {ingredients?.map((ingredient, index) => (
              <ul key={ingredient.ingredient_name}>
                <li className='flex px-5 pb-5 leading-10'>
                  <p className='mx-4'>{`${index + 1} .`}</p>
                  <p>{ingredient.verb}</p>
                  <p className='ms-2'>{ingredient.quantity}</p>
                  <p className='ms-2'>{ingredient.ingredient_name}</p>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <h2 className='font-stroke text-light mx-5 pb-16 text-center text-[1.6rem] font-extrabold uppercase sm:text-start'>
        {cocktail.name}
      </h2>
      <CocktailComments />
      <h2 className='font-stroke text-light mb-10 mt-20 flex px-2 text-center text-[1.4rem] font-extrabold uppercase'>{`you're going to love them !`}</h2>

      <SimilarCocktail />
    </div>
  );
}
