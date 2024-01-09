import { Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { Cocktail } from '@app/types';

type CocktailFormProps = {
  readonly cocktail: Cocktail;
};

type InputCocktailForm = {
  anecdote?: string;
  file?: FileList | null;
};

export default function CocktailForm({ cocktail }: CocktailFormProps) {
  const [uploadedImage, setUploadedImage] = useState<FileList | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [anecdote, setAnecdote] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputCocktailForm>({
    defaultValues: {
      anecdote: '',
      file: null,
    },
  });

  const onSubmit = async (formData: InputCocktailForm) => {
    const { anecdote, file } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('anecdote', anecdote || '');

    if (uploadedImage) {
      formDataToSend.append('cocktailPic', uploadedImage[0]);
    }

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/cocktail/${cocktail.id}/upload`,
        {
          method: 'POST',
          body: formDataToSend,
        },
      );
    } catch (error) {
      console.error(`Erreur de requête`, error);
    }
    setIsFormSubmitted(true);
    setUploadedImage(null);
  };

  return (
    <div>
      <div>
        <form
          encType='multipart/form-data'
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
                onChange: (event) => {
                  setAnecdote(event.target.value);
                },
              })}
            />
            <p className='ms-5 mt-5 text-[rgb(232,40,40)]'>
              {errors.anecdote?.message}
            </p>
            <div className='flex ps-10'>
              <label htmlFor='cocktailPic' className='sr-only'>
                {'Upload Image'}
              </label>
              <input
                type='file'
                id='cocktailPic'
                name='cocktailPic'
                onChange={(event) => {
                  setUploadedImage(event.target.files);
                }}
                className='hidden'
              />
              <label
                htmlFor='cocktailPic'
                className='flex cursor-pointer items-center'
              >
                <Upload />
              </label>
              <label htmlFor='text' className='uppercase' />
            </div>
            <button
              type='submit'
              disabled={!uploadedImage && !anecdote}
              className='ms-auto flex items-center p-3'
            >
              <p className='uppercase'>{`shake it !`}</p>
              <img
                src='/shaker.svg'
                alt='shaker'
                className=' my-auto h-10 w-10 rotate-[30deg] cursor-pointer'
              />
              {isFormSubmitted ? (
                <div className='mt-4 text-center text-green-500'>
                  {'Formulaire envoyé avec succès !'}
                </div>
              ) : null}
            </button>
          </div>
        </form>
      </div>
      <div
        className={`border-dark bg-pastel-beige m-auto mb-20 h-[21rem] w-[80%] rounded-sm border-[3px]`}
      >
        <h3 className='m-4 mt-8 text-center uppercase'>{`discover me !!!`}</h3>
        <p className='ms-5 p-5'>{cocktail.anecdote}</p>
      </div>
    </div>
  );
}
