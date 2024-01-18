/* eslint-disable unicorn/no-null */
import { Upload } from 'lucide-react';
import { useState } from 'react';

export default function UploadForm() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onSubmit = async () => {
    const formDataToSend = new FormData();
    if (uploadedImage) {
      formDataToSend.append('picture', uploadedImage);
    }

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
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
        >
          <div className='flex ps-10'>
            <label htmlFor='picture' className='sr-only'>
              {'Upload Image'}
            </label>
            <input
              type='file'
              id='picture'
              name='picture'
              onChange={(event) => {
                setUploadedImage(event.target.files?.[0] || null);
              }}
              className='hidden'
            />
            <label
              htmlFor='picture'
              className='flex cursor-pointer items-center'
            >
              <Upload />
            </label>
          </div>
          <button type='submit' disabled={!uploadedImage}>
            <p>{`Envoyer`}</p>
            {isFormSubmitted ? (
              <div className='mt-4 text-center text-green-500'>
                {"C'est bueno my friend!"}
              </div>
            ) : null}
          </button>
        </form>
      </div>
    </div>
  );
}
