import { Shuffle } from 'lucide-react';

import type { GlassPartProps } from '@app/types';

const url = `${import.meta.env.VITE_API_URL}/glass`;

export default function GlassPart({ errors, setValue, watch }: GlassPartProps) {
  const shuffleClick = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setValue('glass', data?.[0]);
    } catch (error) {
      console.error(error);
    }
  };

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
      {errors.glass?.type === 'validate' ? (
        <span className='relative bottom-[65px]'>{errors.glass.message}</span>
      ) : undefined}

      <div className='relative bottom-[5%] flex md:bottom-[12%]'>
        <input
          className='w-[200px]'
          value={watch('glass.name') || 'click me'}
        />
        <button
          type='button'
          onClick={async () => {
            await shuffleClick();
          }}
        >
          <Shuffle />
        </button>
      </div>
    </>
  );
}
