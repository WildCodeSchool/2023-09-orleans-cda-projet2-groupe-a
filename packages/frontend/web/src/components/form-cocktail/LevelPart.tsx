import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';

import type { LevelPartProps } from '@app/types';

const numberLevel = [3, 2, 1];

export default function LevelPart({
  level,
  setWithAlcohol,
  withAlcohol,
  setSelectedAlcohols,
  setLevel,
  show,
  setShow,
}: LevelPartProps) {
  const {
    formState: { errors },
    setValue,
  } = useFormContext();
  const handleLevelClick = async (selectedLevel: number) => {
    try {
      const response = await fetch(`/api/alcohol/${selectedLevel}`);

      const result = await response.json();

      setSelectedAlcohols(result);
      if (selectedLevel !== level) {
        setLevel(selectedLevel);
        setValue('level', selectedLevel);
        show < 2 ? setShow(2) : null;
      }
    } catch (error) {
      console.error(
        'Une erreur est survenue lors de la récupération des alcools',
        error,
      );
    }
  };
  return (
    <>
      <label className='relative left-[-35%] top-[-22%] z-[100] inline-flex cursor-pointer items-center'>
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
        <div className="peer h-6 w-11 rounded-full bg-gray-700 shadow-md after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-gray-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gray-300" />
        <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          {'ALCOHOL'}
        </span>
      </label>
      <h1 className='relative bottom-[3%] w-[200px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your duel'}
      </h1>

      {errors.level ? (
        <span className='relative bottom-[25px] sm:bottom-[55px] md:bottom-[25px]'>
          {errors.level.message as string}
        </span>
      ) : null}

      <div className='relative bottom-[3%] left-[-4%] flex flex-row-reverse sm:bottom-[6%] sm:left-[-2%]'>
        {numberLevel.map((number) => (
          <div
            key={number}
            className={`peer h-[90px] w-[70px] bg-[url('/form-cocktail/fire-level.png')] bg-cover bg-no-repeat grayscale transition-transform ease-in-out hover:scale-110 hover:cursor-pointer hover:grayscale-0 peer-hover:grayscale-0 sm:h-[120px] sm:w-[100px] ${
              level >= number ? 'grayscale-0 ' : 'grayscale'
            }`}
            onClick={() => {
              void handleLevelClick(number);
            }}
          />
        ))}
      </div>
    </>
  );
}
