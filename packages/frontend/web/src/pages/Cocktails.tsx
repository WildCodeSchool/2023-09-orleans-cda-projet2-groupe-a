import { useEffect, useState } from 'react';

import CardCocktail from '@/components/cocktails/CardCocktail';
import CardTitle from '@/components/cocktails/CardTitle';
import FilterBar from '@/components/cocktails/FilterBar';

interface CocktailsProps {
  cocktail_id: number;
  cocktail_name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
  readonly cardCocktails: CocktailsProps[] | undefined;
}
interface Filters {
  ingredient: string[];
  // alcohol: string[];
  // flavour: string[];
  // kcal: string[];
  // complexity: string[];
  // strength: string[];
}

const initialFilters: Filters = {
  // alcohol: [],
  ingredient: [],
  // flavour: [],
  // kcal: [],
  // complexity: [],
  // strength: [],
};
export default function Cocktails() {
  const [cocktails, setCocktails] = useState<CocktailsProps[] | undefined>();
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const fetchCocktails = async (signal: AbortSignal, filters: Filters) => {
    const queryParameters = new URLSearchParams();
    (Object.keys(filters) as Array<keyof Filters>).map((filterKey) => {
      filters[filterKey].map((filterValue: string) => {
        queryParameters.append(filterKey, filterValue);
      });
    });

    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/cocktail/alcohol/search?${queryParameters.toString()}`,
      {
        signal,
      },
    );
    if (response.ok) {
      const data = await response.json();
      setCocktails(data.cocktailsWithAlcohol);
      console.log(data.cocktailsWithAlcohol);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchCocktails(signal, filters).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [filters]);

  const [isFilterBarVisible, setIsFilterBarVisible] = useState(true);
  const toggleFilterBarVisibility = () => {
    setIsFilterBarVisible((prevVisible) => !prevVisible);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters); // Update the filters state with the new filters
  };

  // const elementReference = useRef(null);
  // const [isFixed, setIsFixed] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log('Entering useEffect');

  //     const scrollPosition = window.scrollY;
  //     console.log(scrollPosition);

  //     const threshold = 50;
  //     setIsFixed(scrollPosition >= threshold);
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('bg-cocktails.png')` }}
    >
      <CardTitle />
      <button
        type='button'
        onClick={toggleFilterBarVisibility}
        className='font-stroke text-light ms-10 mt-6 cursor-pointer text-[1.2rem] uppercase'
      >
        {`filter by`}
      </button>
      <div className='sm:grid sm:grid-flow-col'>
        {isFilterBarVisible ? (
          <div>
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
        ) : null}
        <CardCocktail cocktails={cocktails} />
      </div>
    </div>
  );
}
