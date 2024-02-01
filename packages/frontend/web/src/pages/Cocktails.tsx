import { useEffect, useState } from 'react';

import CardCocktail from '@/components/cocktails/CardCocktail';
import CardTitle from '@/components/cocktails/CardTitle';
import FilterBar from '@/components/cocktails/FilterBar';
import SearchBar from '@/components/cocktails/SearchBar';

interface Cocktails {
  cocktail_id: number;
  cocktail_name: string;
  avg_rating: number;
  cocktail_image: string;
  cocktail_created: Date;
  readonly cardCocktails: Cocktails[] | undefined;
}
interface Filters {
  alcohols: string[];
  ingredients: string[];
  flavours: string[];
  kcals: string[];
  complexities: string[];
  degrees: string[];
}

const initialFilters: Filters = {
  alcohols: [],
  ingredients: [],
  flavours: [],
  kcals: [],
  complexities: [],
  degrees: [],
};

type InputSearchBar = {
  searchTerm?: string;
};

export default function Cocktails() {
  const [cocktails, setCocktails] = useState<Cocktails[] | undefined>();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isFilterBarVisible, setIsFilterBarVisible] = useState(true);
  const categories = [
    'alcohols',
    'ingredients',
    'flavours',
    'kcals',
    'complexities',
    'degrees',
  ];

  const fetchCocktails = async (
    signal: AbortSignal,
    filters: Filters,
    searchTerm?: string,
  ) => {
    const queryParameters = new URLSearchParams();

    if (searchTerm) {
      queryParameters.append('searchTerm', searchTerm);
    }

    const alcoholValues = filters.alcohols;
    if (alcoholValues.length > 0) {
      for (const value of alcoholValues) {
        queryParameters.append('ingredients', value);
      }
    }

    for (const category of categories) {
      if (category === 'alcohols') continue;

      const values = filters[category as keyof Filters];

      if (values.length > 0) {
        for (const value of values) {
          queryParameters.append(category, value);
        }
      }
    }

    const response = await fetch(
      `/api/cocktail/alcohol?${queryParameters.toString()}`,
      { signal },
    );

    if (response.ok) {
      const data = await response.json();
      setCocktails(data.cocktails);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  const toggleFilterBarVisibility = () => {
    setIsFilterBarVisible((prevVisible) => !prevVisible);
  };

  const controller = new AbortController();
  const onSubmit = async (data: InputSearchBar) => {
    try {
      await fetchCocktails(
        controller.signal,
        filters,
        data.searchTerm as string,
      ).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(`Request error: ${error as string}`);
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

  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16'
      style={{ backgroundImage: `url('bg-cocktails.png')` }}
    >
      <CardTitle />
      <div className='sm:grid sm:grid-cols-4'>
        <div className='col-span-1'>
          <button
            type='button'
            onClick={toggleFilterBarVisibility}
            className='font-stroke text-light ms-10 mt-6 cursor-pointer text-[1.2rem] uppercase'
          >
            {`filter by`}
          </button>
          {isFilterBarVisible ? (
            <div>
              <SearchBar setCocktails={setCocktails} onSubmit={onSubmit} />
              <div>
                <FilterBar filters={filters} setFilters={setFilters} />
              </div>
            </div>
          ) : null}
        </div>
        <div className='col-span-3 my-24'>
          <CardCocktail cocktails={cocktails} />
        </div>
      </div>
    </div>
  );
}
