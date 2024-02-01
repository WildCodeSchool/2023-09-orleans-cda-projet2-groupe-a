import { Upload } from 'lucide-react';
import { useState } from 'react';

import type { Cocktail } from '@app/types';

type CocktailFormProps = {
  readonly cocktail: Cocktail;
};

export default function CocktailForm({ cocktail }: CocktailFormProps) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [anecdote, setAnecdote] = useState('');

  const onSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('anecdote', anecdote || '');

    if (uploadedImage) {
      formDataToSend.append('cocktailPic', uploadedImage);
    }

    try {
      await fetch(`/api/cocktail/${cocktail.id}/upload`, {
        method: 'POST',
        body: formDataToSend,
      });
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
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit();
          }}
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
              value={anecdote}
              onChange={(event) => {
                setAnecdote(event.target.value);
              }}
            />
            <div className='flex'>
              <label htmlFor='cocktailPic' className='sr-only'>
                {'Upload Image'}
              </label>
              <input
                type='file'
                id='cocktailPic'
                name='cocktailPic'
                onChange={(event) => {
                  setUploadedImage(event.target.files?.[0] || null);
                }}
                className='hidden'
              />
              <label
                htmlFor='cocktailPic'
                className='flex cursor-pointer items-center'
              >
                <Upload className='mt-4 stroke-[3px]' />
              </label>
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
                  {'Form sent successfully !'}
                </div>
              ) : null}
            </button>
          </div>
        </form>
      </div>
      <div
        className={`border-dark bg-pastel-beige m-auto mb-20 w-[80%] rounded-sm border-[3px]`}
      >
        <h3 className='m-4 mt-8 text-center uppercase'>{`discover me !!!`}</h3>
        <p className='mb-5 ms-5 p-5'>{cocktail.anecdote}</p>
      </div>
    </div>
  );
}
