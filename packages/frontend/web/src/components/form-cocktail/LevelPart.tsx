import type { LevelPart } from '@app/types/src/cocktail-form';

export default function LevelPart({ level, handleClick, errors }: LevelPart) {
  return (
    <>
      <h1 className='relative bottom-[3%] w-[200px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your duel'}
      </h1>
      {errors.level ? (
        <span className='relative bottom-[25px] sm:bottom-[55px] md:bottom-[25px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      <div className='relative bottom-[3%] left-[-4%] flex sm:bottom-[6%] sm:left-[-2%]'>
        <div
          className={`peer order-3 h-[90px] w-[70px] bg-[url('/form-cocktail/fire-level.png')] bg-cover bg-no-repeat grayscale hover:cursor-pointer hover:grayscale-0 peer-hover:grayscale-0 sm:h-[120px] sm:w-[100px] ${
            level >= 3 ? 'grayscale-0 ' : 'grayscale'
          }`}
          onClick={() => {
            handleClick(3);
          }}
        />
        <div
          className={`peer order-2 h-[90px] w-[70px] bg-[url('/form-cocktail/fire-level.png')] bg-cover bg-no-repeat grayscale hover:cursor-pointer hover:grayscale-0 peer-hover:grayscale-0 sm:h-[120px] sm:w-[100px] ${
            level >= 2 ? 'grayscale-0 ' : 'grayscale'
          }`}
          onClick={() => {
            handleClick(2);
          }}
        />
        <div
          className={`peer order-1 h-[90px] w-[70px] bg-[url('/form-cocktail/fire-level.png')] bg-cover bg-no-repeat grayscale hover:cursor-pointer hover:grayscale-0 peer-hover:grayscale-0 sm:h-[120px] sm:w-[100px] ${
            level >= 1 ? 'grayscale-0 ' : 'grayscale'
          }`}
          onClick={() => {
            handleClick(1);
          }}
        />
      </div>
    </>
  );
}
