import { useState } from 'react';

import type { Ingredient, SyrupProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

const url = `${import.meta.env.VITE_API_URL}/ingredient/syrup`;

export default function Syrup({ errors, watch, handleClickSyrup }: SyrupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasSyrupOrNot, setHasSyrupOrNot] = useState('syrup');

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };

  const { data } = useFetch<Ingredient[]>(url);

  return (
    <>
      <label className='relative bottom-[7%] w-[250px] text-center text-xl uppercase sm:bottom-[12%] sm:w-[300px] sm:text-2xl'>
        {'Choose or not your syrup'}
      </label>

      {errors.alcohol?.type === 'required' ? (
        <span className='relative bottom-[50px] sm:bottom-[90px] md:bottom-[35px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.alcohol?.type === 'validate' ? (
        <span className='relative bottom-[50px] sm:bottom-[90px] md:bottom-[35px]'>
          {errors.alcohol.message}
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
                className='w-[100px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              >
                {'Syrup'}
              </li>
              <li
                className='w-[100px] hover:cursor-pointer'
                onClick={() => {
                  setHasSyrupOrNot('none');
                  handleClickSyrup(null);
                  handleClickSelect();
                }}
              >
                {'none'}
              </li>
              {data === undefined
                ? null
                : data.map((syrup) => (
                    <li
                      key={syrup.id}
                      className='w-[100px] hover:cursor-pointer'
                      onClick={() => {
                        handleClickSyrup(syrup);
                        handleClickSelect();
                      }}
                    >
                      {syrup.name}
                    </li>
                  ))}
            </ul>
          ) : (
            <ul>
              <li
                className='relative bottom-[-10px] w-[100px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              >
                {watch('syrup.name') || hasSyrupOrNot}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
