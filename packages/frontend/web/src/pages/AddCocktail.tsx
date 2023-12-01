import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { CocktailForm } from '@app/types/src/cocktail-form';

import AlcoholPart from '@/components/form-cocktail/AlcoholPart';
import GlassPart from '@/components/form-cocktail/GlassPart';
import IngredientsPart from '@/components/form-cocktail/IngredientsPart';
import LevelPart from '@/components/form-cocktail/LevelPart';
import NamePart from '@/components/form-cocktail/NamePart';
import ToppingPart from '@/components/form-cocktail/ToppingPart';

const onSubmit: SubmitHandler<CocktailForm> = (data) => {
  return data;
};

export default function AddCocktail() {
  const [level, setLevel] = useState<number>(0);

  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [selectedTopping, setSelectedTopping] = useState<string>('');

  const handleIngredientChange = (value: string) => {
    setSelectedIngredient(value);
  };
  const handleToppingChange = (value: string) => {
    setSelectedTopping(value);
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

  const handleClick = (number: number) => {
    if (number === level) {
      setLevel(0);
    } else {
      setLevel(number);
      setValue('level', number);
    }
  };

  const handleClickAlcohol = (alcohol: string) => {
    setValue('alcohol', alcohol, { shouldValidate: true });
  };

  const handleErroSubmit = () => {
    if (watch('alcohol') === undefined) {
      setError('alcohol', { type: 'required', message: 'required' });
    } else {
      clearErrors('alcohol');
    }

    if (watch('level') === undefined) {
      setError('level', { type: 'required', message: 'required' });
    } else {
      clearErrors('level');
    }
  };

  const squares = [
    {
      color: 'purple',
      order: {
        lg: 1,
        md: 1,
      },
      square: {
        lg: ['right'],
        md: ['right'],
      },
      width: {
        lg: 110,
        md: 105,
      },
      myComponent: (
        <LevelPart level={level} handleClick={handleClick} errors={errors} />
      ),
    },
    {
      color: 'yellow',
      order: {
        lg: 3,
        md: 4,
      },
      square: {
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
      myComponent: (
        <AlcoholPart
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
      square: {
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
      myComponent: (
        <IngredientsPart
          register={register}
          selectedIngredient={selectedIngredient}
          handleIngredientChange={handleIngredientChange}
          errors={errors}
        />
      ),
    },
    {
      color: 'orange',
      order: {
        lg: 2,
        md: 5,
      },
      square: {
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
      myComponent: <GlassPart register={register} errors={errors} />,
    },
    {
      color: 'green',
      order: {
        lg: 4,
        md: 3,
      },
      square: {
        lg: ['right', 'left'],
        md: ['right'],
      },
      width: {
        lg: 103,
        md: 105,
      },
      myComponent: (
        <ToppingPart
          register={register}
          selectedTopping={selectedTopping}
          handleToppingChange={handleToppingChange}
          errors={errors}
        />
      ),
    },
    {
      color: 'pink',
      order: {
        lg: 'last',
        md: 'last',
      },
      square: {
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
      myComponent: (
        <NamePart
          register={register}
          handleErroSubmit={handleErroSubmit}
          errors={errors}
        />
      ),
    },
  ];

  return (
    <form className='flex justify-center' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-screen grid-flow-col grid-rows-6 gap-1 gap-y-2 md:h-screen md:grid-rows-3 md:p-3 lg:grid-rows-2'>
        {squares.map((div, index) => (
          <div
            key={div.color}
            className={`bg-dark relative lg:clip-path-polygon-${
              div.color
            }-lg md:clip-path-polygon-${div.color}-md order-${
              index + 1
            } lg:order-${div.order.lg} md:order-${
              div.order.md
            } h-screen w-full md:h-full lg:w-[${div.width.lg}%] md:w-[${
              div.width.md
            }%] ${
              div.right === undefined
                ? ''
                : `lg:right-[${div.right.lg}%] md:right-[${div.right.md}%]`
            }`}
          >
            <div
              className={`lg:clip-path-polygon-${
                div.color
              }-lg md:clip-path-polygon-${
                div.color
              }-md h-screen w-full bg-transparent md:h-full md:p-2 ${
                div.square.md.includes('left') ? 'md:ps-2.5' : ''
              } ${div.square.md.includes('right') ? 'md:pe-2.5' : ''} ${
                div.square.lg.includes('left') ? 'lg:ps-2.5' : ''
              } ${div.square.lg.includes('right') ? 'lg:pe-2.5' : ''}`}
            >
              <div
                className={`bg-dark-${div.color} lg:clip-path-polygon-${div.color}-lg md:clip-path-polygon-${div.color}-md border-dark relative h-screen w-full border-[10px] md:h-full md:border-none`}
              >
                <div
                  className={`filter-black-to-${div.color} flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat md:h-full md:bg-[url('polygon-black.png')]`}
                />
                <div
                  className={`absolute left-[3%] top-0 flex h-screen w-[95%] flex-col items-center justify-center sm:left-[10%] md:left-0 bg-[url('form-cocktail/bubble/bubble-${
                    index + 1
                  }.png')] bg-contain bg-center bg-no-repeat sm:w-[80%] md:h-full md:w-full md:bg-auto`}
                >
                  {div.myComponent}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
