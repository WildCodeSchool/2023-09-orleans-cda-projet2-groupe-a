import type { NamePartProps } from '@app/types';

import ShakerIcon from '../icons/ShakerIcon';

export default function NamePart({
  register,
  errors,
  handleErrorSubmit,
}: NamePartProps) {
  return (
    <>
      <h1 className='relative w-[300px] rotate-[-12deg] text-center text-xl uppercase sm:text-2xl md:bottom-[8%] lg:w-[350px]'>
        {'Choose a name for your cocktail:'}
      </h1>
      <input
        className='w-[200px] rotate-[-12deg] border-b-[2px] border-dashed'
        {...register('name', {
          required: true,
          maxLength: { value: 255, message: "can't be longer than 255" },
          validate: {
            isString: (value) =>
              typeof value === 'string' || 'Must be a string',
          },
        })}
      />

      {errors.name?.type === 'required' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.name?.type === 'maxLength' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.name.message}
        </span>
      ) : undefined}
      {errors.name?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.name.message}
        </span>
      ) : undefined}

      <div className='relative bottom-[-30%] flex w-full items-center justify-end md:bottom-[-10%] lg:bottom-[-25%]'>
        <h2 className='md:text-md font-stroke text-light text-xl uppercase lg:text-2xl'>
          {'Shake it!'}
        </h2>
        <button
          type='submit'
          onClick={() => {
            handleErrorSubmit();
          }}
        >
          <ShakerIcon />
        </button>
      </div>
    </>
  );
}
