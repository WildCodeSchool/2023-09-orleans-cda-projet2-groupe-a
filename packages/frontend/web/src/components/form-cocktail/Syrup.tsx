import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Ingredient, SyrupProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

const url = `/api/ingredient/syrup`;

export default function Syrup({ show, setShow }: SyrupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasSyrupOrNot, setHasSyrupOrNot] = useState('Syrup');
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const handleClickSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleClickSyrup = (syrup: Ingredient | null) => {
    show < 3 ? setShow(3) : null;
    syrup === null ? setValue('syrup', null) : setValue('syrup', syrup);
  };

  const { data } = useFetch<Ingredient[]>(url);

  return (
    <>
      <label className='relative bottom-[7%] w-[250px] text-center text-xl uppercase sm:bottom-[12%] sm:w-[300px] sm:text-2xl'>
        {'Choose or not your syrup'}
      </label>

      {errors.syrup ? (
        <span className='relative bottom-[30px] sm:bottom-[80px] md:bottom-[25px]'>
          {errors.syrup.message as string}
        </span>
      ) : null}

      <div className='relative bottom-[5%] flex gap-3 sm:bottom-[10%] sm:left-[0%]'>
        <img
          src='form-cocktail/arrow-yellow.png'
          className={`transition-transform ease-in-out hover:scale-110 hover:cursor-pointer ${
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
            <ul className='border-dark absolute bottom-[-220px] left-[-12%] h-[250px] w-[160px] overflow-y-scroll rounded-lg border-[4px] bg-white p-2 shadow-xl sm:bottom-[-220px] sm:h-[125px] md:bottom-[-95px] md:left-[-11.8%] md:top-[1rem] md:h-[150px] lg:left-[-12%]'>
              <li
                className='w-[100px] hover:cursor-pointer'
                onClick={() => {
                  handleClickSelect();
                }}
              />
              <li
                className='w-[100px] transition-transform ease-in-out hover:scale-110 hover:cursor-pointer'
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
                      className='w-[100px] transition-transform ease-in-out hover:scale-110 hover:cursor-pointer'
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
