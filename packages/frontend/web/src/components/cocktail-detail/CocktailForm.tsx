import { Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';

import type { Cocktail } from '@app/types';

type CocktailFormProps = {
  readonly cocktail: Cocktail;
};

// Input de la page cocktail-detail
type InputCocktailForm = {
  anecdote?: string;
  file?: string;
  content?: string;
};

// Upload image
export type File = {
  originalname: 'string';
  filename: 'string';
};
export default function CocktailForm({ cocktail }: CocktailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputCocktailForm>({
    defaultValues: {
      anecdote: '',
      file: '',
    },
  });

  const onSubmit = async (data: InputCocktailForm) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/cocktail/${cocktail.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {
      console.error(`Request error`);
    }
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`border-dark bg-pastel-yellow relative m-auto mb-20 h-[26rem] w-[80%] rounded-sm border-[3px] uppercase sm:flex-wrap`}
        >
          <div className='mx-auto mt-6 flex flex-col items-center'>
            <label htmlFor='text' className='uppercase'>
              {cocktail.name}
            </label>
            <input
              type='text'
              id='text'
              placeholder='Put your description !'
              className='bg-light-beige border-dark mt-10 h-[13rem] w-[85%] rounded-sm border-2 p-5'
              {...register('anecdote', {
                required: false,
                maxLength: { value: 255, message: 'Max length exceeded !' },
              })}
            />
            <p className='ms-5 mt-5 text-[rgb(232,40,40)]'>
              {errors.anecdote?.message}
            </p>
            <div className='flex ps-10'>
              <Upload
                color='#0E0F0F'
                className='my-auto h-7 w-7 stroke-[3px]'
              />
              <label htmlFor='text' className='uppercase' />
            </div>
            <button type='submit' className='ms-auto flex items-center p-3'>
              <p className='uppercase'>{`shake it !`}</p>
              <img
                src='/shaker.svg'
                alt='shaker'
                className=' my-auto h-10 w-10 rotate-[30deg] cursor-pointer'
              />
            </button>
          </div>
        </form>
      </div>
      <div
        className={`border-dark bg-pastel-beige } m-auto mb-20 w-[80%] rounded-sm border-[3px]`}
      >
        <h3 className='m-4 mt-8 text-center uppercase'>{`discover me !!!`}</h3>
        <p className='mb-5 ms-5 p-5'>{cocktail.anecdote}</p>
      </div>
    </div>
  );
}
