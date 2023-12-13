import { Shuffle } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { Glass, GlassPartProps } from '@app/types';

import useFetch from '@/hooks/use-fetch';

export default function GlassPart({ errors, setValue, watch }: GlassPartProps) {
  const [isReload, setIsReload] = useState(false);
  const url = `${import.meta.env.VITE_API_URL}/glass`;
  const { data } = useFetch<Pick<Glass, 'name' | 'id'>[]>(url, [isReload]);

  const shuffleClick = () => {
    setIsReload(!isReload);
  };
  useEffect(() => {
    if (data !== undefined) {
      setValue('glass', data[0]);
    }
  }, [data, setValue]);

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
