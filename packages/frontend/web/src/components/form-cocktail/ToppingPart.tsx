import { MoveRight, Skull } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import type { Flavour, Topping, ToppingPartProps } from '@app/types';

export default function ToppingPart({
  selectedTopping,
  selectedAlcohol,
  handleToppingChange,
  errors,
  watch,
}: ToppingPartProps) {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [mainFlavour, setMainFlavour] = useState<string>('');
  const [randomTopping, setRandomTopping] = useState<Topping | null>(null);
  const [isRandomToppingChoosen, setIsRandomToppingChoosen] =
    useState<boolean>(false);

  const ingredients = watch('ingredients');
  const selectedIngredient = ingredients ? ingredients[2] : undefined;
  const allFlavours = [
    ingredients?.[0]?.flavour,
    ingredients?.[1]?.flavour,
    ingredients?.[2]?.flavour,
    selectedAlcohol?.flavour,
  ];

  const memoizedFlavoursCount = useMemo(() => {
    // eslint-disable-next-line unicorn/no-array-reduce
    return allFlavours.reduce<Record<Flavour, number>>(
      (count, flavour) => {
        if (flavour !== undefined) {
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
  }, [selectedAlcohol?.flavour, selectedIngredient?.flavour]);

  useEffect(() => {
    if (selectedAlcohol && selectedIngredient) {
      // eslint-disable-next-line unicorn/no-array-reduce
      const [maxFlavour] = Object.entries(memoizedFlavoursCount).reduce(
        ([currentFlavour, currentCount], [flavour, count]) =>
          count > currentCount
            ? [flavour, count]
            : [currentFlavour, currentCount],
        ['', 0],
      );

      setMainFlavour(maxFlavour);

      fetch(`/api/topping/${maxFlavour}`)
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
  }, [memoizedFlavoursCount, mainFlavour, selectedAlcohol, selectedIngredient]);

  const handleRandomToppingChoice = async () => {
    try {
      const response = await fetch(`/api/topping/random/1`);
      const result = await response.json();
      setRandomTopping(result[0]);
      setIsRandomToppingChoosen((prev) => !prev);
      handleToppingChange(result);
    } catch (error) {
      console.error(error);
    }
  };
  const shouldShowRandomTopping = isRandomToppingChoosen && randomTopping;

  useEffect(() => {
    if (shouldShowRandomTopping) {
      handleToppingChange(randomTopping);
    }
  }, [shouldShowRandomTopping, randomTopping, handleToppingChange]);

  return (
    <>
      <h1 className='relative bottom-[5%] w-[300px] text-center text-xl uppercase sm:bottom-[15%] sm:text-2xl'>
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
      {shouldShowRandomTopping ? (
        <p>{randomTopping.name}</p>
      ) : (
        <fieldset className='relative bottom-[4%] grid grid-flow-col grid-rows-2 gap-3 sm:bottom-[8%]'>
          {toppings.map((topping) => (
            <div key={topping.id} className='flex gap-3'>
              <input
                className='hover:cursor-pointer'
                type='radio'
                id={topping.name}
                value={topping.name}
                checked={selectedTopping?.name === topping.name}
                onChange={() => {
                  handleToppingChange(topping);
                }}
              />
              <label className='hover:cursor-pointer' htmlFor={topping.name}>
                {topping.name}
              </label>
            </div>
          ))}
        </fieldset>
      )}
      <div className='relative top-[33%] flex w-full items-center justify-end gap-2 md:top-[11%] md:me-[150px] lg:top-[24%] lg:me-0 lg:mr-20 lg:gap-1'>
        <p className='md:text-md font-stroke text-light text-end uppercase sm:w-[50%] lg:w-full'>
          <span className='block'>{'Or random...'}</span>
          <span className='block'>{'At your peril !'}</span>
        </p>
        <MoveRight size={40} />
        <button onClick={handleRandomToppingChoice} type='button'>
          <Skull size={45} />
        </button>
      </div>
    </>
  );
}
