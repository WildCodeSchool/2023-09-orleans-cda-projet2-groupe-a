import type { LevelPartProps } from '@app/types';

const numberLevel = [3, 2, 1];

export default function LevelPart({
  level,
  handleLevelClick,
  errors,
  setWithAlcohol,
  withAlcohol,
}: LevelPartProps) {
  return (
    <>
      <label className='relative left-[-35%] top-[-22%] z-[100] inline-flex cursor-pointer items-center'>
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
      <h1 className='relative bottom-[3%] w-[200px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your duel'}
      </h1>

      {errors.level?.type === 'required' ? (
        <span className='relative bottom-[25px] sm:bottom-[55px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.level?.type === 'validate' ? (
        <span className='relative bottom-[25px] sm:bottom-[55px] md:bottom-[25px]'>
          {errors.level.message}
        </span>
      ) : undefined}

      <div className='relative bottom-[3%] left-[-4%] flex flex-row-reverse sm:bottom-[6%] sm:left-[-2%]'>
        {numberLevel.map((number) => (
          <div
            key={number}
            className={`peer h-[90px] w-[70px] bg-[url('/form-cocktail/fire-level.png')] bg-cover bg-no-repeat grayscale hover:cursor-pointer hover:grayscale-0 peer-hover:grayscale-0 sm:h-[120px] sm:w-[100px] ${
              level >= number ? 'grayscale-0 ' : 'grayscale'
            }`}
            onClick={() => {
              handleLevelClick(number);
            }}
          />
        ))}
      </div>
    </>
  );
}
