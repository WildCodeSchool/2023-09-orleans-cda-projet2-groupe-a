import { useEffect, useState } from 'react';

import type { Topping, ToppingPartProps } from '@app/types';

export default function ToppingPart({
  register,
  selectedTopping,
  handleToppingChange,
  errors,
}: ToppingPartProps) {
  const [toppings, setToppings] = useState<Topping[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/toppings`)
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
  }, []);

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
