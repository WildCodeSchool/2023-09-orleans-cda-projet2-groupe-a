import { MoveRight, Skull } from 'lucide-react';
import type { UseFormRegister } from 'react-hook-form';

import type { Inputs } from '@app/types';

export default function IngredientsPart({
  register,
  selectedIngredient,
  handleIngredientChange,
}: {
  readonly register: UseFormRegister<Inputs>;
  readonly selectedIngredient: string;
  readonly handleIngredientChange: (ingredient: string) => void;
}) {
  return (
    <>
      <h1 className='relative bottom-[2%] w-[250px] text-center text-xl uppercase sm:bottom-[10%] sm:w-[300px] sm:text-2xl'>
        {'Choose your fuse'}
      </h1>
      <fieldset className='relative bottom-[-0%] grid grid-flow-col grid-rows-3 gap-2 gap-x-4 sm:bottom-[4%]'>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='salmon'
            value='salmon'
            {...register('ingredient')}
            checked={selectedIngredient === 'salmon'}
            onChange={() => {
              handleIngredientChange('salmon');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='salmon'>
            {'salmon'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='carot'
            value='carot'
            {...register('ingredient')}
            checked={selectedIngredient === 'carot'}
            onChange={() => {
              handleIngredientChange('carot');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='carot'>
            {'carot'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='lemon'
            value='lemon'
            {...register('ingredient')}
            checked={selectedIngredient === 'lemon'}
            onChange={() => {
              handleIngredientChange('lemon');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='lemon'>
            {'lemon'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='mint'
            value='mint'
            {...register('ingredient')}
            checked={selectedIngredient === 'mint'}
            onChange={() => {
              handleIngredientChange('mint');
            }}
          />

          <label className='hover:cursor-pointer' htmlFor='mint'>
            {'mint'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='ice'
            value='ice'
            {...register('ingredient')}
            checked={selectedIngredient === 'ice'}
            onChange={() => {
              handleIngredientChange('ice');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='ice'>
            {'ice'}
          </label>
        </div>
        <div className='flex gap-3'>
          <input
            className='hover:cursor-pointer'
            type='radio'
            id='hair'
            value='hair'
            {...register('ingredient')}
            checked={selectedIngredient === 'hair'}
            onChange={() => {
              handleIngredientChange('hair');
            }}
          />
          <label className='hover:cursor-pointer' htmlFor='hair'>
            {'hair'}
          </label>
        </div>
      </fieldset>
      <div className='relative top-[33%] flex w-full items-center justify-end gap-2 md:top-[11%] lg:top-[24%] lg:gap-6'>
        <p className='lg:text-md md:text-md text-end uppercase sm:w-[50%] lg:w-full'>
          {'Choose your blend or amend'}
        </p>
        <MoveRight size={40} />
        <button type='button'>
          <Skull size={45} />
        </button>
      </div>
    </>
  );
}
