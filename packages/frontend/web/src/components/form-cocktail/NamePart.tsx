import { useFormContext } from 'react-hook-form';

import ShakerIcon from '../icons/ShakerIcon';

export default function NamePart() {
  const {
    register,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();
  const handleErrorSubmit = () => {
    const alcoholValue = watch('alcohol');
    const softDrinkValue = watch('softDrink');

    if (alcoholValue === undefined && softDrinkValue === undefined) {
      setError('alcohol', { type: 'required', message: 'required' });
      setError('softDrink', { type: 'required', message: 'required' });
    } else if (
      (alcoholValue !== undefined &&
        typeof alcoholValue.name === 'string' &&
        alcoholValue.name.length <= 255) ||
      (softDrinkValue !== undefined &&
        typeof softDrinkValue.name === 'string' &&
        softDrinkValue.name.length <= 255)
    ) {
      clearErrors('alcohol');
      clearErrors('softDrink');
    } else {
      setError('alcohol', {
        type: 'validate',
        message: 'must be a string of 255 characters max',
      });
      setError('softDrink', {
        type: 'validate',
        message: 'must be a string of 255 characters max',
      });
    }

    const levelValue = watch('level');

    if (levelValue === undefined && softDrinkValue === undefined) {
      setError('level', { type: 'required', message: 'required' });
    } else if (
      (typeof levelValue === 'number' && levelValue <= 3 && levelValue >= 1) ||
      softDrinkValue !== undefined
    ) {
      clearErrors('level');
    } else {
      setError('level', {
        type: 'validate',
        message: 'must be a number between 1 and 3',
      });
    }

    const ingredientsValue = watch('ingredients');

    if (ingredientsValue === undefined) {
      setError('ingredients', {
        type: 'required',
        message: 'required',
      });
    } else {
      clearErrors('ingredients');
    }

    const glassValue = watch('glass');

    if (glassValue === undefined) {
      setError('glass', { type: 'required', message: 'required' });
    } else if (typeof glassValue.id === 'number') {
      clearErrors('glass');
    } else {
      setError('glass', {
        type: 'validate',
        message: 'must be a number',
      });
    }
  };
  return (
    <>
      <h1 className='relative w-[300px] rotate-[-12deg] text-center text-xl uppercase sm:text-2xl md:bottom-[8%] lg:w-[350px]'>
        {'Choose a name for your cocktail:'}
      </h1>
      <input
        className='w-[200px] rotate-[-12deg] border-b-[2px] border-dashed'
        {...register('name', {
          required: { value: true, message: 'write a name' },
          maxLength: { value: 255, message: "can't be longer than 255" },
          validate: {
            isString: (value) =>
              typeof value === 'string' || 'Must be a string',
          },
        })}
      />

      {errors.name ? (
        <span className='relative bottom-[-10px] rotate-[-12deg]'>
          {errors.name.message as string}
        </span>
      ) : null}

      <div className='relative bottom-[-30%] flex w-full items-center justify-end md:bottom-[-10%] lg:bottom-[-25%]'>
        <h2 className='md:text-md font-stroke text-light cursor-pointer text-xl uppercase transition-transform ease-in-out hover:scale-110 lg:text-2xl'>
          {'Shake it!'}
        </h2>
        <button
          type='submit'
          onClick={() => {
            handleErrorSubmit();
          }}
        >
          <ShakerIcon />
        </button>
      </div>
    </>
  );
}
