import type { LevelPartProps } from '@app/types';

const numberLevel = [3, 2, 1];

export default function LevelPart({
  level,
  handleLevelClick,
  errors,
}: LevelPartProps) {
  return (
    <>
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
