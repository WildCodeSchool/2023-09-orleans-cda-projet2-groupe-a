import type { UseFormRegister } from 'react-hook-form';

import type { Inputs } from '@app/types';

export default function ToppingPart({
  register,
  selectedTopping,
  handleToppingChange,
}: {
  readonly register: UseFormRegister<Inputs>;
  readonly selectedTopping: string;
  readonly handleToppingChange: (topping: string) => void;
}) {
  return (
    <>
      <h1 className='relative bottom-[9%] w-[300px] text-center text-xl uppercase sm:bottom-[19%] sm:text-2xl'>
        {'Pick a topic'}
      </h1>
      <fieldset className='relative bottom-[6%] grid grid-flow-col grid-rows-2 gap-3 sm:bottom-[12%]'>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='shrimps'
            value='shrimps'
            {...register('topping')}
            checked={selectedTopping === 'shrimps'}
            onChange={() => {
              handleToppingChange('shrimps');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='shrimps'>
            {'shrimps'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='hairs'
            value='hairs'
            {...register('topping')}
            checked={selectedTopping === 'hairs'}
            onChange={() => {
              handleToppingChange('hairs');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='hairs'>
            {'hairs'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='lemon'
            value='lemon'
            {...register('topping')}
            checked={selectedTopping === 'lemon'}
            onChange={() => {
              handleToppingChange('lemon');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='lemon'>
            {'lemon'}
          </label>
        </div>
      </fieldset>
    </>
  );
}
