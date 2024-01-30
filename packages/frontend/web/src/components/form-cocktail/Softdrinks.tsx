import { useState } from 'react';

import type { Ingredient, SoftdrinksProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

export default function Softdrinks({
  errors,
  watch,
  handleClickSoftDrinks,
  setWithAlcohol,
  withAlcohol,
}: SoftdrinksProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };
  const url = `${import.meta.env.VITE_API_URL}/ingredient/softdrinks`;

  const { data, isLoading } = useFetch<Ingredient[]>(url);

  return (
    <>
      <label className='relative left-[-35%] top-[-32%] z-[100] inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          value=''
          className='peer sr-only'
          checked={withAlcohol}
          onChange={() => {
            setWithAlcohol(!withAlcohol);
          }}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
        <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          {'alcohol ?'}
        </span>
      </label>
      <label className='relative bottom-[7%] w-[250px] text-center text-xl uppercase sm:bottom-[12%] sm:w-[300px] sm:text-2xl'>
        {'Choose your booze'}
      </label>

      {errors.softdrink?.type === 'required' ? (
        <span className='relative bottom-[50px] sm:bottom-[90px] md:bottom-[35px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.softdrink?.type === 'validate' ? (
        <span className='relative bottom-[50px] sm:bottom-[90px] md:bottom-[35px]'>
          {errors.softdrink.message}
        </span>
      ) : undefined}

      <div className='relative bottom-[5%] flex gap-3 sm:bottom-[10%] sm:left-[0%]'>
        <img
          src='form-cocktail/arrow-yellow.png'
          className={`hover:cursor-pointer ${
            isOpen
              ? 'relative right-[103%] sm:right-[105%] lg:right-[105%]'
              : ''
          }`}
          alt=''
          onClick={() => {
            handleClickSelect();
          }}
        />
        <div>
          {isOpen ? (
            <ul className='absolute bottom-[-220px] left-[-12%] h-[250px] w-[125px] overflow-y-scroll bg-white p-1 sm:bottom-[-220px] sm:h-[250px] md:bottom-[-95px] md:left-[-11.8%] md:h-[125px] lg:bottom-[-190px] lg:left-[-12%] lg:h-[220px]'>
              <li
                className='w-[200px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              >
                {'Soft drinks'}
              </li>
              {data === undefined
                ? null
                : data.map((softdrinks) => (
                    <li
                      key={softdrinks.id}
                      className='w-[200px] hover:cursor-pointer'
                      onClick={() => {
                        handleClickSoftDrinks(softdrinks);
                        handleClickSelect();
                      }}
                    >
                      {softdrinks.name}
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
                {watch('softdrink.name') || 'soft drinks'}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
