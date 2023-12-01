import type { ToppingPart } from '@app/types/src/cocktail-form';

const toppings = ['shrimps', 'lemon', 'mint'];

export default function ToppingPart({
  register,
  selectedTopping,
  handleToppingChange,
  errors,
}: ToppingPart) {
  return (
    <>
      <h1 className='relative bottom-[7%] w-[300px] text-center text-xl uppercase sm:bottom-[15%] sm:text-2xl'>
        {'Pick a topic'}
      </h1>
      {errors.topping ? (
        <span className='relative bottom-[40px] sm:bottom-[90px] md:bottom-[45px]'>
          {'This field is required'}
        </span>
      ) : undefined}
      <fieldset className='relative bottom-[4%] grid grid-flow-col grid-rows-2 gap-3 sm:bottom-[8%]'>
        {toppings.map((topping) => (
          <div key={topping} className='flex gap-3'>
            <input
              className='hover:cursor-pointer'
              type='radio'
              id={topping}
              value={topping}
              {...register('topping', { required: true })}
              checked={selectedTopping === topping}
              onChange={() => {
                handleToppingChange(topping);
              }}
            />
            <label className='hover:cursor-pointer' htmlFor={topping}>
              {topping}
            </label>
          </div>
        ))}
      </fieldset>
    </>
  );
}
