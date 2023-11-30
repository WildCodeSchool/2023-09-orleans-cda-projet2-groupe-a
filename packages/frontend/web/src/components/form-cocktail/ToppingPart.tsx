import type { ToppingPart } from '@app/types/src/cocktail-form';

export default function ToppingPart({
  register,
  selectedTopping,
  handleToppingChange,
}: ToppingPart) {
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
