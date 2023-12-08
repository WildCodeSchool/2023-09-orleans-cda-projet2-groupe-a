import { Shuffle } from 'lucide-react';

import type { GlassPartProps } from '@app/types';

export default function GlassPart({ register, errors }: GlassPartProps) {
  return (
    <>
      <h1 className='relative bottom-[9%] w-[300px] text-center text-xl uppercase sm:bottom-[15%] sm:text-2xl md:bottom-[22%]'>
        {'Your glass'}
      </h1>

      {errors.glass?.type === 'required' ? (
        <span className='relative bottom-[65px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      {errors.glass?.type === 'maxLength' ? (
        <span className='relative bottom-[65px]'>{errors.glass.message}</span>
      ) : undefined}
      {errors.glass?.type === 'isString' ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.glass.message}
        </span>
      ) : undefined}

      <div className='relative bottom-[5%] flex md:bottom-[12%]'>
        <input
          className='w-[150px]'
          value={'Whisky glass'}
          {...register('glass', {
            required: true,
            maxLength: { value: 255, message: "can't be longer than 255" },
            validate: {
              isString: (value) =>
                typeof value === 'string' || 'Must be a string',
            },
          })}
        />
        <button type='button'>
          <Shuffle />
        </button>
      </div>
    </>
  );
}
