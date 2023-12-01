import type { NamePart } from '@app/types/src/cocktail-form';

import ShakerIcon from '../icons/ShakerIcon';

export default function NamePart({
  register,
  errors,
  handleErroSubmit,
}: NamePart) {
  return (
    <>
      <h1 className='relative w-[300px] rotate-[-12deg] text-center text-xl uppercase sm:text-2xl md:bottom-[8%] lg:w-[350px]'>
        {'Choose a name for your cocktail:'}
      </h1>
      <input
        className='w-[200px] rotate-[-12deg] border-b-[2px] border-dashed'
        {...register('name', { required: true })}
      />
      {errors.name ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {'This field is required'}
        </span>
      ) : undefined}

      <div className='relative bottom-[-30%] flex w-full items-center justify-end md:bottom-[-10%] lg:bottom-[-25%]'>
        <h2 className='md:text-md font-stroke text-light text-xl uppercase lg:text-2xl'>
          {'Shake it!'}
        </h2>
        <button
          type='submit'
          onClick={() => {
            handleErroSubmit();
          }}
        >
          <ShakerIcon />
        </button>
      </div>
    </>
  );
}
