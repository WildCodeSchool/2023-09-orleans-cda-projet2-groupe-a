import { Shuffle } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { GlassPartProps } from '@app/types';

const url = `${import.meta.env.VITE_API_URL}/glass`;

export default function GlassPart({ errors, setValue, watch }: GlassPartProps) {
  const [isReload, setIsReload] = useState(false);

  const fetchData = async (url: RequestInfo, controller: AbortController) => {
    const res = await fetch(url, {
      signal: controller.signal,
    });
    const info = await res.json();
    setValue('glass', info[0]);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(url, controller).catch((error) => {
      console.error(error);
    });
    return () => {
      controller.abort();
    };
  }, [isReload]);

  const shuffleClick = () => {
    setIsReload(!isReload);
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
        <input className='w-[200px]' value={watch('glass.name')} />
        <button
          type='button'
          onClick={() => {
            shuffleClick();
          }}
        >
          <Shuffle />
        </button>
      </div>
    </>
  );
}
