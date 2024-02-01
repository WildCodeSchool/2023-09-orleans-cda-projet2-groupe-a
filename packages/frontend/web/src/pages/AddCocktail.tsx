import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { CocktailForm } from '@app/types';
import type { Ingredient } from '@app/types';

import AlcoholPart from '@/components/form-cocktail/AlcoholPart';
import GlassPart from '@/components/form-cocktail/GlassPart';
import IngredientsPart from '@/components/form-cocktail/IngredientsPart';
import LevelPart from '@/components/form-cocktail/LevelPart';
import ModalSearch from '@/components/form-cocktail/ModalSearch';
import NamePart from '@/components/form-cocktail/NamePart';
import ToppingPart from '@/components/form-cocktail/ToppingPart';

const onSubmit: SubmitHandler<CocktailForm> = (data) => {
  return data;
};

export default function AddCocktail() {
  const [isModalShown, setIsModalShown] = useState(false);
  const [actualIngredient, setActualIngredient] = useState(0);

  const [level, setLevel] = useState<number>(0);
  const [show, setShow] = useState<number>(1);

  const [selectedAlcohol, setSelectedAlcohol] = useState<Ingredient | null>(
    null,
  );

  const [selectedTopping, setSelectedTopping] = useState<string>('');

  const [selectedAlcohols, setSelectedAlcohols] = useState<Ingredient[]>([]);

  const handleToppingChange = (value: string) => {
    setSelectedTopping(value);
    setShow(6);
  };

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    watch,
  } = useForm<CocktailForm>();

  const handleLevelClick = async (selectedLevel: number) => {
    try {
      const response = await fetch(`/api/alcohols/${selectedLevel}`);
      const result = await response.json();
      setSelectedAlcohols(result);
      if (selectedLevel === level) {
        setLevel(0);
      } else {
        setLevel(selectedLevel);
        setValue('level', selectedLevel);
        setShow(2);
      }
    } catch (error) {
      console.error(
        'Une erreur est survenue lors de la récupération des alcools',
        error,
      );
    }
  };

  const handleClickAlcohol = (alcohol: Ingredient) => {
    setShow(3);
    setSelectedAlcohol(alcohol);
  };

  const handleErrorSubmit = () => {
    const alcoholValue = watch('alcohol');

    if (alcoholValue === undefined) {
      setError('alcohol', { type: 'required', message: 'required' });
    } else if (
      typeof alcoholValue.name === 'string' &&
      alcoholValue.name.length <= 255
    ) {
      clearErrors('alcohol');
    } else {
      setError('alcohol', {
        type: 'validate',
        message: 'must be a string of 255 characters max',
      });
    }

    const levelValue = watch('level');

    if (levelValue === undefined) {
      setError('level', { type: 'required', message: 'required' });
    } else if (
      typeof levelValue === 'number' &&
      levelValue <= 3 &&
      levelValue >= 1
    ) {
      clearErrors('level');
    } else {
      setError('level', {
        type: 'validate',
        message: 'must be a number between 1 and 3',
      });
    }

    const ingredientsValue = watch('ingredients');

    if (ingredientsValue === undefined) {
      setError('ingredients', { type: 'required', message: 'required' });
    } else if (
      ingredientsValue.length === 3 &&
      ingredientsValue.every((ingredient) => typeof ingredient.id === 'number')
    ) {
      clearErrors('ingredients');
    } else {
      setError('ingredients', {
        type: 'validate',
        message: 'please choose 3 ingredients',
      });
    }

    const glassValue = watch('glass');

    if (glassValue === undefined) {
      setError('glass', { type: 'required', message: 'required' });
    } else if (typeof glassValue.id === 'number') {
      clearErrors('glass');
    } else {
      setError('glass', {
        type: 'validate',
        message: 'must be a number',
      });
    }
  };

  const squares = [
    {
      color: 'purple',
      order: {
        lg: 1,
        md: 1,
      },
      biasSide: {
        lg: ['right'],
        md: ['right'],
      },
      width: {
        lg: 110,
        md: 105,
      },
      component: (
        <LevelPart
          level={level}
          handleLevelClick={handleLevelClick}
          errors={errors}
        />
      ),
    },
    {
      color: 'yellow',
      order: {
        lg: 3,
        md: 4,
      },
      biasSide: {
        lg: ['right', 'left'],
        md: ['left'],
      },
      width: {
        lg: 130,
        md: 116,
      },
      right: {
        lg: 15,
        md: 16,
      },
      component: (
        <AlcoholPart
          alcohols={selectedAlcohols}
          handleClickAlcohol={handleClickAlcohol}
          watch={watch}
          errors={errors}
        />
      ),
    },
    {
      color: 'blue',
      order: {
        lg: 5,
        md: 2,
      },
      biasSide: {
        lg: ['left'],
        md: ['left'],
      },
      width: {
        lg: 108,
        md: 105,
      },
      right: {
        lg: 8,
        md: 0,
      },
      component: (
        <IngredientsPart
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          setShow={setShow}
          setIsModalShown={setIsModalShown}
          actualIngredient={actualIngredient}
          setActualIngredient={setActualIngredient}
        />
      ),
    },
    {
      color: 'orange',
      order: {
        lg: 2,
        md: 5,
      },
      biasSide: {
        lg: ['right'],
        md: ['right'],
      },
      width: {
        lg: 110,
        md: 110,
      },
      right: {
        lg: 0,
        md: 10,
      },
      component: <GlassPart errors={errors} setValue={setValue} />,
    },
    {
      color: 'green',
      order: {
        lg: 4,
        md: 3,
      },
      biasSide: {
        lg: ['right', 'left'],
        md: ['right'],
      },
      width: {
        lg: 103,
        md: 105,
      },
      component: (
        <ToppingPart
          register={register}
          selectedTopping={selectedTopping}
          selectedAlcohol={selectedAlcohol}
          handleToppingChange={handleToppingChange}
          errors={errors}
          watch={watch}
        />
      ),
    },
    {
      color: 'pink',
      order: {
        lg: '6',
        md: '6',
      },
      biasSide: {
        lg: ['left'],
        md: ['left'],
      },
      width: {
        lg: 104,
        md: 105,
      },
      right: {
        lg: 4,
        md: 5,
      },
      component: (
        <NamePart
          register={register}
          handleErrorSubmit={handleErrorSubmit}
          errors={errors}
        />
      ),
    },
  ];

  return (
    <>
      <form className='flex justify-center' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid w-screen grid-flow-col grid-rows-6 gap-1 gap-y-2 md:h-screen md:grid-rows-3 md:p-3 lg:grid-rows-2'>
          {squares.map((square, index) => (
            <div
              key={square.color}
              className={`bg-dark relative lg:clip-path-polygon-${
                square.color
              }-lg md:clip-path-polygon-${square.color}-md lg:order-${
                square.order.lg
              } md:order-${square.order.md} h-screen w-full md:h-full lg:w-[${
                square.width.lg
              }%] md:w-[${square.width.md}%] ${
                square.right === undefined
                  ? ''
                  : `lg:right-[${square.right.lg}%] md:right-[${square.right.md}%]`
              }`}
            >
              <div
                className={`lg:clip-path-polygon-${
                  square.color
                }-lg md:clip-path-polygon-${
                  square.color
                }-md h-screen w-full bg-transparent md:h-full md:p-2 ${
                  square.biasSide.md.includes('left') ? 'md:ps-2.5' : ''
                } ${square.biasSide.md.includes('right') ? 'md:pe-2.5' : ''} ${
                  square.biasSide.lg.includes('left') ? 'lg:ps-2.5' : ''
                } ${square.biasSide.lg.includes('right') ? 'lg:pe-2.5' : ''}`}
              >
                <div
                  className={`bg-dark-${square.color} lg:clip-path-polygon-${square.color}-lg md:clip-path-polygon-${square.color}-md border-dark relative h-screen w-full border-[10px] md:h-full md:border-none`}
                >
                  <div
                    className={`filter-black-to-${square.color} flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat md:h-full md:bg-[url('polygon-black.png')]`}
                  />
                  <div
                    className={`
    ${show < index + 1 ? 'opacity-0' : 'opacity-100'} 
    absolute left-[3%] 
    top-0 flex h-screen w-[95%] flex-col items-center justify-center transition-opacity duration-500 sm:left-[10%] md:left-0 bg-[url('form-cocktail/bubble/bubble-${
      index + 1
    }.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto`}
                  >
                    {square.component}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
      {isModalShown ? (
        <div className='relative'>
          <ModalSearch
            setIsModalShown={setIsModalShown}
            setValue={setValue}
            watchIngredient={watch}
            setShow={setShow}
            actualIngredient={actualIngredient}
            setActualIngredient={setActualIngredient}
          />
        </div>
      ) : null}
    </>
  );
}
