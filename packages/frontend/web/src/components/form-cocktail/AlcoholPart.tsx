import { useState } from 'react';

import type { AlcoholPartProps } from '@app/types';

const alcoholArray = [
  'Gin',
  'Tequila',
  'Vodka',
  'Cider',
  'Amaretto',
  'Red wine',
  'White wine',
  'Peach wine',
  'Wisky',
  'Cognac',
  'Champagne',
];

export default function AlcoholPart({
  handleClickAlcohol,
  watch,
  errors,
}: AlcoholPartProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <label className='relative bottom-[7%] w-[250px] text-center text-xl uppercase sm:bottom-[12%] sm:w-[300px] sm:text-2xl'>
        {'Choose your booze'}
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
                {'Alcohol'}
              </li>
              {alcoholArray.map((name) => (
                <li
                  key={name}
                  className='w-[100px] hover:cursor-pointer'
                  onClick={() => {
                    handleClickAlcohol(name);
                    handleClickSelect();
                  }}
                >
                  {name}
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
                {watch('alcohol') ?? 'Alcohol'}
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
