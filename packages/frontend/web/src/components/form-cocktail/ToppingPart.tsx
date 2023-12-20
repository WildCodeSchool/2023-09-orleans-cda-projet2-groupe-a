import { useEffect, useState } from 'react';

import type { Topping, ToppingPartProps } from '@app/types';

export default function ToppingPart({
  register,
  selectedTopping,
  selectedIngredient,
  selectedAlcohol,
  handleToppingChange,
  errors,
}: ToppingPartProps) {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [mainFlavour, setMainFlavour] = useState<string>('');
  const [mainFlavourCount, setMainFlavourCount] = useState<number>(0);

  const allFlavours = [selectedAlcohol?.flavour, selectedIngredient?.flavour];
  // eslint-disable-next-line unicorn/no-array-reduce
  const flavoursCount = allFlavours.reduce(
    (count, flavour) => {
      if (flavour) {
        count[flavour] = (count[flavour] || 0) + 1;
      }
      return count;
    },
    {
      fruity: 0,
      spicy: 0,
      herbaceous: 0,
      floral: 0,
      woody: 0,
      bitter: 0,
      sweet: 0,
      salty: 0,
      sour: 0,
      neutral: 0,
    },
  );

  useEffect(() => {
    if (selectedAlcohol && selectedIngredient) {
      const [maxFlavour, maxFlavourCount] = Object.entries(
        flavoursCount,
        // eslint-disable-next-line unicorn/no-array-reduce
      ).reduce(
        ([currentFlavour, currentCount], [flavour, count]) =>
          count > currentCount
            ? [flavour, count]
            : [currentFlavour, currentCount],
        ['', 0],
      );

      setMainFlavour(maxFlavour);
      setMainFlavourCount(maxFlavourCount);

      fetch(`${import.meta.env.VITE_API_URL}/topping/${maxFlavour}`)
        .then((response) => response.json())
        .then((data) => {
          setToppings(data);
        })
        .catch((error) => {
          console.error(
            'Erreur lors de la récupération des toppings depuis le backend :',
            error,
          );
        });
    }
  }, [flavoursCount, selectedAlcohol, selectedIngredient]);

  return (
    <>
      <h1 className='relative bottom-[7%] w-[300px] text-center text-xl uppercase sm:bottom-[15%] sm:text-2xl'>
        {'Pick a topping'}
      </h1>

      {errors.topping?.type === 'required' ? (
        <span className='relative bottom-[40px] sm:bottom-[90px] md:bottom-[45px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.topping?.type === 'maxLength' ? (
        <span className='relative bottom-[40px] sm:bottom-[90px] md:bottom-[45px]'>
          {errors.topping.message}
        </span>
      ) : undefined}
      {errors.topping?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.topping.message}
        </span>
      ) : undefined}

      <fieldset className='relative bottom-[4%] grid grid-flow-col grid-rows-2 gap-3 sm:bottom-[8%]'>
        {toppings.map((topping) => (
          <div key={topping.id} className='flex gap-3'>
            <input
              className='hover:cursor-pointer'
              type='radio'
              id={topping.name}
              value={topping.name}
              {...register('topping', {
                required: true,
                maxLength: { value: 255, message: "can't be longer than 255" },
                validate: {
                  isString: (value) =>
                    typeof value === 'string' || 'Must be a string',
                },
              })}
              checked={selectedTopping === topping.name}
              onChange={() => {
                handleToppingChange(topping.name);
              }}
            />
            <label className='hover:cursor-pointer' htmlFor={topping.name}>
              {topping.name}
            </label>
          </div>
        ))}
      </fieldset>
    </>
  );
}
