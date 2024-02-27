import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Ingredient, SoftDrinksProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

export default function SoftDrinks({
  show,
  setShow,
  setWithAlcohol,
  withAlcohol,
}: SoftDrinksProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };
  const url = `/api/ingredient/softdrinks`;

  const { data } = useFetch<Ingredient[]>(url);

  const handleClickSoftDrinks = (softDrink: Ingredient) => {
    show < 3 ? setShow(3) : null;
    setValue('softDrink', softDrink);
  };

  return (
    <>
      <label className='relative left-[-35%] top-[-32%] z-[100] inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          hidden
          value=''
          className='peer sr-only'
          checked={withAlcohol}
          onChange={() => {
            setWithAlcohol(!withAlcohol);
          }}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-700  after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-700  after:bg-white after:transition-all after:content-[''] peer-checked:bg-transparent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gray-700" />
        <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          {'VIRGIN'}
        </span>
      </label>
      <label className='relative bottom-[7%] w-[250px] text-center text-xl uppercase sm:bottom-[12%] sm:w-[300px] sm:text-2xl'>
        {'Choose your booze'}
      </label>

      {errors.softDrink ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {errors.softDrink.message as string}
        </span>
      ) : null}

      <div className='relative bottom-[5%] flex gap-3 sm:bottom-[10%]'>
        <img
          src='form-cocktail/arrow-yellow.png'
          className={`transition-transform ease-in-out hover:scale-100 hover:cursor-pointer ${
            isOpen
              ? 'relative right-[103%] sm:right-[105%] lg:right-[6.3rem]'
              : ''
          }`}
          alt=''
          onClick={() => {
            handleClickSelect();
          }}
        />
        <div>
          {isOpen ? (
            <ul className='border-dark absolute bottom-[-220px] left-[-12%] h-[250px] w-[220px] overflow-y-scroll rounded-lg border-[4px] bg-white p-2 shadow-xl sm:bottom-[-220px] sm:h-[125px] md:bottom-[-95px] md:left-[-3rem] md:top-[1rem] md:h-[150px]'>
              <li
                className='w-[200px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              />
              {data === undefined
                ? null
                : data.map((softDrinks) => (
                    <li
                      key={softDrinks.id}
                      className='w-[200px] transition-transform ease-in-out hover:scale-110 hover:cursor-pointer'
                      onClick={() => {
                        handleClickSoftDrinks(softDrinks);
                        handleClickSelect();
                      }}
                    >
                      {softDrinks.name}
                    </li>
                  ))}
            </ul>
          ) : (
            <ul>
              <li
                className='relative bottom-[-10px] w-[200px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              >
                {watch('softDrink.name') || 'soft drinks'}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
