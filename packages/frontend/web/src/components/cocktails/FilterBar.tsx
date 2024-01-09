import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
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
  cocktail_kcal: string;
  kcal_id: number;
};

type Degree = {
  cocktail_degree: string;
  degree_id: number;
};

type Complexity = {
  cocktail_complexity: string;
  complexity_id: number;
};

interface Filters {
  alcohol: string[];
  ingredients: string[];
  flavour: string[];
  kcal: string[];
  complexity: string[];
  degree: string[];
}

const initialFilters: Filters = {
  alcohol: [],
  ingredients: [],
  flavour: [],
  kcal: [],
  complexity: [],
  degree: [],
};

interface FilterBarProps {
  readonly onFilterChange: (newFilters: Filters) => void;
}

type Menu = string;

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>();
  const [alcohols, setAlcohols] = useState<Alcohol[] | undefined>();
  const [flavours, setFlavours] = useState<Flavour[] | undefined>();
  const [kcals, setKcals] = useState<Kcal[] | undefined>();
  const [degrees, setDegrees] = useState<Degree[] | undefined>();
  const [complexities, setComplexities] = useState<Complexity[] | undefined>();

  const [openMenus, setOpenMenus] = useState<Menu[]>([]);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const isMenuOpen = (menu: Menu): boolean => openMenus.includes(menu);

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

  const handleCheckboxChange = (
    type: keyof Filters,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      updatedFilters[type] = checked
        ? [...prevFilters[type], value]
        : prevFilters[type].filter((item) => item !== value);
      onFilterChange(updatedFilters);

      return updatedFilters;
    });
  };

  const handleToggleMenu = (menu: Menu) => {
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
        <div className='my-8 sm:ms-6'>
          <div className='flex justify-center'>
            <div className='border-dark bg-card-green mx-auto w-[18rem] rounded-sm border-[3px] p-4 uppercase sm:w-[15rem]'>
              <div className='grid-raws-7 grid h-full w-full grid-rows-1 gap-2'>
                <div className='text-[1rem]'>
                  <label
                    onClick={() => {
                      handleToggleMenu('alcohol');
                    }}
                    className='font-stroke text-light flex h-[2rem] uppercase'
                  >
                    {`alcohol`}
                    {isMenuOpen('alcohol') ? (
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
                  {isMenuOpen('alcohol') && (
                    <div className='mt-2'>
                      {alcohols?.map((alcohol, index) => (
                        <motion.div
                          key={alcohol.alcohol_id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                          className='normal-case'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={alcohol.alcohol_name}
                            checked={filters.alcohol.includes(
                              alcohol.alcohol_name,
                            )}
                            onChange={(event) => {
                              handleCheckboxChange('alcohol', event);
                            }}
                            id={alcohol.alcohol_name}
                          />
                          <label
                            htmlFor={alcohol.alcohol_name}
                            className='whitespace-nowrap '
                          >
                            {alcohol.alcohol_name}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='text-[1rem]'>
                  <label
                    onClick={() => {
                      handleToggleMenu('ingredient');
                    }}
                    className='font-stroke text-light flex h-[2rem] uppercase'
                  >
                    {`ingredient`}

                    {isMenuOpen('ingredient') ? (
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
                  {isMenuOpen('ingredient') && (
                    <div className='mt-2 h-[17rem] overflow-y-scroll'>
                      {ingredients?.map((ingredient, index) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.05 }}
                          key={ingredient.ingredient_id}
                          className='normal-case'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={ingredient.ingredient_name}
                            checked={filters.ingredients.includes(
                              ingredient.ingredient_name,
                            )}
                            onChange={(event) => {
                              handleCheckboxChange('ingredients', event);
                            }}
                            id={ingredient.ingredient_name}
                          />
                          <label
                            htmlFor={ingredient.ingredient_name}
                            className='whitespace-nowrap '
                          >
                            {ingredient.ingredient_name}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='text-[1rem]'>
                  <label
                    onClick={() => {
                      handleToggleMenu('flavour');
                    }}
                    className='font-stroke text-light flex h-[2rem] uppercase'
                  >
                    {`flavour`}
                    {isMenuOpen('flavour') ? (
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
                  {isMenuOpen('flavour') && (
                    <div className='mt-2'>
                      {flavours?.map((flavour, index) => (
                        <motion.div
                          key={flavour.flavour_id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                          className='capitalize'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={flavour.cocktail_flavour}
                            checked={filters.flavour.includes(
                              flavour.cocktail_flavour,
                            )}
                            onChange={(event) => {
                              handleCheckboxChange('flavour', event);
                            }}
                            id={flavour.cocktail_flavour}
                          />
                          <label
                            htmlFor={flavour.cocktail_flavour}
                            className='whitespace-nowrap '
                          >
                            {flavour.cocktail_flavour}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='text-[1rem]'>
                  <div className='flex'>
                    <label
                      onClick={() => {
                        handleToggleMenu('kcal');
                      }}
                      className='font-stroke text-light flex h-[2rem] uppercase'
                    >
                      {`kcal`}
                      {isMenuOpen('kcal') ? (
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
                  </div>
                  {isMenuOpen('kcal') && (
                    <div className='mt-2'>
                      {kcals?.map((kcal, index) => (
                        <motion.div
                          key={kcal.kcal_id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                          className='normal-case'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={kcal.cocktail_kcal}
                            checked={filters.kcal.includes(kcal.cocktail_kcal)}
                            onChange={(event) => {
                              handleCheckboxChange('kcal', event);
                            }}
                            id={kcal.cocktail_kcal}
                          />
                          <label
                            htmlFor={kcal.cocktail_kcal}
                            className='whitespace-nowrap '
                          >
                            {kcal.cocktail_kcal}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='text-[1rem]'>
                  <label
                    onClick={() => {
                      handleToggleMenu('complexity');
                    }}
                    className='font-stroke text-light flex h-[2rem] uppercase'
                  >
                    {`complextiy`}
                    {isMenuOpen('complexity') ? (
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
                  {isMenuOpen('complexity') && (
                    <div className='mt-2'>
                      {complexities?.map((complexity, index) => (
                        <motion.div
                          key={complexity.complexity_id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                          className='normal-case'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={complexity.cocktail_complexity}
                            checked={filters.complexity.includes(
                              complexity.cocktail_complexity,
                            )}
                            onChange={(event) => {
                              handleCheckboxChange('complexity', event);
                            }}
                            id={complexity.cocktail_complexity}
                          />
                          <label
                            htmlFor={complexity.cocktail_complexity}
                            className='whitespace-nowrap '
                          >
                            {complexity.cocktail_complexity}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='text-[1rem]'>
                  <label
                    onClick={() => {
                      handleToggleMenu('strength');
                    }}
                    className='font-stroke text-light flex h-[2rem] uppercase'
                  >
                    {`strength`}
                    {isMenuOpen('strength') ? (
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
                  {isMenuOpen('strength') && (
                    <div className='mt-2'>
                      {degrees?.map((degree, index) => (
                        <motion.div
                          key={degree.degree_id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 2, delay: index * 0.1 }}
                          className='normal-case'
                        >
                          <input
                            className='accent-dark me-3'
                            type='checkbox'
                            value={degree.cocktail_degree}
                            checked={filters.degree.includes(
                              degree.cocktail_degree,
                            )}
                            onChange={(event) => {
                              handleCheckboxChange('degree', event);
                            }}
                            id={degree.cocktail_degree}
                          />
                          <label
                            htmlFor={degree.cocktail_degree}
                            className='whitespace-nowrap '
                          >
                            {degree.cocktail_degree}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
