import { Upload } from 'lucide-react';
import { useState } from 'react';

import type { Cocktail } from '@app/types';

type CocktailFormProps = {
  readonly cocktail: Cocktail;
  readonly isFormVisible: boolean;
  readonly setIsFormVisible: (isFormVisible: boolean) => void;
};

export default function CocktailForm({
  cocktail,
  isFormVisible,
  setIsFormVisible,
}: CocktailFormProps) {
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
      const response = await fetch(`/api/cocktail/${cocktail.id}/upload`, {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.ok) {
        await response.json();
      } else {
        throw new Error('Server responded with non-OK status');
      }
    } catch (error) {
      console.error(`Request error`, error);
    }
    setIsFormSubmitted(true);
    setUploadedImage(null);
    setIsFormVisible(false);
  };

  return (
    <div>
      <div>
        {isFormVisible ? (
          <form
            encType='multipart/form-data'
            onSubmit={async (event) => {
              event.preventDefault();
              await onSubmit();
            }}
            className='border-dark bg-pastel-yellow relative m-auto mb-20 h-[27rem] w-[80%] rounded-sm border-[3px] uppercase sm:flex-wrap'
          >
            <div className='mx-auto mt-6 flex flex-col items-center'>
              <label htmlFor='text' className='mb-3 uppercase'>
                {cocktail.name}
              </label>
              {isFormSubmitted ? (
                <div className='m-auto text-center normal-case text-green-500'>
                  {'Form sent successfully !'}
                </div>
              ) : null}
              <input
                type='text'
                id='text'
                placeholder='Put your description !'
                className='bg-light-beige border-dark mt-5 h-[14rem] w-[85%] rounded-sm border-2 p-5'
                value={anecdote}
                onChange={(event) => {
                  setAnecdote(event.target.value);
                }}
              />
              <input
                type='file'
                id='cocktailPic'
                name='cocktailPic'
                placeholder='Upload your image !'
                onChange={(event) => {
                  setUploadedImage(event.target.files?.[0] || null);
                }}
                className='ms-28 mt-2 w-full'
              />
              <div className='flex w-full justify-around'>
                <label
                  htmlFor='cocktailPic'
                  className='mt-2 normal-case transition-transform ease-in-out hover:scale-110'
                >
                  <p className='my-2'>{'Upload your image!'}</p>
                  <Upload className='m-auto stroke-[3px]' />
                </label>
                <label
                  htmlFor='cocktailPic'
                  className='flex cursor-pointer items-center'
                />
                <div className='flex normal-case'>
                  <button
                    type='submit'
                    disabled={!uploadedImage && !anecdote}
                    className='ms-auto flex cursor-pointer items-center justify-end transition-transform ease-in-out hover:rotate-3 hover:scale-110'
                  >
                    <p className='uppercase'>{`shake it !`}</p>
                    <img
                      src='/shaker.svg'
                      alt='shaker'
                      className=' my-auto h-10 w-10 rotate-[30deg] cursor-pointer'
                    />
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
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
