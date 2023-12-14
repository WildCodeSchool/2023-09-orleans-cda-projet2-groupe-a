import { Shuffle } from 'lucide-react';
import { useState } from 'react';

import type { GlassPartProps } from '@app/types';

const url = `${import.meta.env.VITE_API_URL}/glass`;

export default function GlassPart({ errors, setValue, watch }: GlassPartProps) {
  const [controller, setController] = useState(new AbortController());

  const fetchData = async (url: RequestInfo, controller: AbortController) => {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    const info = await res.json();
    setValue('glass', info[0]);
  };

  const shuffleClick = async () => {
    controller.abort();
    const newController = new AbortController();
    setController(newController);

    try {
      await fetchData(url, newController);
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
          value={watch('glass.name') || `Click me`}
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
