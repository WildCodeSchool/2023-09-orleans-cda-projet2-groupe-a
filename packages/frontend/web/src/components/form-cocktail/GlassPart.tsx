import { Shuffle } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { Glass, GlassPartProps } from '@app/types';

const url = `/api/glass`;

export default function GlassPart({ errors, setValue }: GlassPartProps) {
  const [glass, setGlass] = useState<Pick<Glass, 'name' | 'id'>>();

  const fetchData = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setValue('glass', data);
      setGlass(data);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(url, signal).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, []);

  const shuffleClick = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setValue('glass', data);
      setGlass(data);
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
        <p className='w-[200px]'>{glass?.name}</p>
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
