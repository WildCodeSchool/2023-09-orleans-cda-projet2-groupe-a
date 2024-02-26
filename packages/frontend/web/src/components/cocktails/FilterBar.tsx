import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Alcohol {
  name: string;
  id: number;
}

interface Ingredient {
  name: string;
  id: number;
}

interface Flavour {
  name: string;
  id: number;
}

interface Kcal {
  name: string;
  d: number;
}

interface Degree {
  name: string;
  id: number;
}

interface Complexity {
  name: string;
  id: number;
}

interface Filters {
  alcohols: string[];
  ingredients: string[];
  flavours: string[];
  kcals: string[];
  complexities: string[];
  degrees: string[];
}

interface FilterBarProps {
  readonly filters: Filters;
  readonly setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [alcohols, setAlcohols] = useState<Alcohol[] | undefined>();
  const [flavours, setFlavours] = useState<Flavour[] | undefined>();
  const [kcals, setKcals] = useState<Kcal[] | undefined>();
  const [degrees, setDegrees] = useState<Degree[] | undefined>();
  const [complexities, setComplexities] = useState<Complexity[] | undefined>();

  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const isMenuOpen = (menu: string): boolean => openMenus.includes(menu);

  type FilterCategory = {
    name: keyof Filters;
    state:
      | Alcohol[]
      | Ingredient[]
      | Flavour[]
      | Kcal[]
      | Degree[]
      | Complexity[]
      | undefined;
  };

  const filterCategories: FilterCategory[] = [
    { name: 'alcohols', state: alcohols },
    { name: 'ingredients', state: ingredients },
    { name: 'flavours', state: flavours },
    { name: 'kcals', state: kcals },
    { name: 'complexities', state: complexities },
    { name: 'degrees', state: degrees },
  ];

  const fetchFilterBar = async (signal: AbortSignal) => {
    const response = await fetch(`/api/filter`, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setIngredients(data.filters.ingredients);
      setAlcohols(data.filters.alcohols);
      setFlavours(data.filters.flavours);
      setKcals(data.filters.kcals);
      setDegrees(data.filters.degrees);
      setComplexities(data.filters.complexities);
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

  const handleCheckboxChange = (
    type: keyof Filters,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked: isChecked } = event.target;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      updatedFilters[type] = isChecked
        ? [...prevFilters[type], value]
        : prevFilters[type].filter((item) => item !== value);

      return updatedFilters;
    });
  };

  const handleToggleMenu = (menu: string) => {
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(menu)
        ? prevOpenMenus.filter((item) => item !== menu)
        : [...prevOpenMenus, menu],
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className='mb-8 mt-4 flex justify-center sm:ms-6 sm:justify-normal'>
          <div className='border-dark bg-card-green w-[18rem] rounded-sm border-[3px] p-4 uppercase sm:w-[15rem]'>
            <div className='grid-raws-7 grid h-full w-full grid-rows-1 gap-2'>
              {filterCategories.map((category) => (
                <div key={category.name} className='text-[1rem]'>
                  <label
                    onClick={() => {
                      handleToggleMenu(category.name);
                    }}
                    className='font-stroke text-light flex h-[2rem] cursor-pointer uppercase'
                  >
                    {category.name}
                    {isMenuOpen(category.name) ? (
                      <Minus
                        color='#0E0F0F'
                        className='ms-2 h-7 w-7 stroke-[3px]'
                      />
                    ) : (
                      <Plus
                        color='#0E0F0F'
                        className='ms-2 h-7 w-7 stroke-[3px]'
                      />
                    )}
                  </label>
                  {isMenuOpen(category.name) && (
                    <div
                      className={`normal-case ${
                        category.name === 'ingredients'
                          ? 'scrollbar-bigger-rounded mt-2 h-[15rem] overflow-y-scroll'
                          : 'mt-2'
                      }`}
                    >
                      {category.state?.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                          className='normal-case'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={item.name}
                            checked={filters[category.name].includes(
                              item.name.toString(),
                            )}
                            onChange={(event) => {
                              handleCheckboxChange(category.name, event);
                            }}
                            id={item.name}
                          />
                          <label
                            htmlFor={item.name}
                            className='whitespace-nowrap'
                          >
                            {item.name}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
