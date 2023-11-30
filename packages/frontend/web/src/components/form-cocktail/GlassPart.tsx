import { Shuffle } from 'lucide-react';

import type { GlassPart } from '@app/types/src/cocktail-form';

export default function GlassPart({ register }: GlassPart) {
  return (
    <>
      <h1 className='relative bottom-[9%] w-[300px] text-center text-xl uppercase sm:bottom-[15%] sm:text-2xl md:bottom-[22%]'>
        {'Your glass'}
      </h1>
      <div className='sm: relative bottom-[5%] flex md:bottom-[12%]'>
        <input
          className='w-[150px]'
          value={'Wisky glass'}
          readOnly
          {...register('glass')}
        />
        <button type='button'>
          <Shuffle />
        </button>
      </div>
    </>
  );
}
