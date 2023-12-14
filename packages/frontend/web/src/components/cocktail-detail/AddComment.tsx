import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import type { InputCocktailForm } from '@app/types';

interface AddCommentProps {
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly popUp: RefObject<HTMLDivElement>;
}
export default function AddComment({ setIsOpen, popUp }: AddCommentProps) {
  const { id } = useParams();

  const handleClose = () => {
    setIsOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputCocktailForm>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: InputCocktailForm) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/comment/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsOpen(false);
    } catch {
      console.error(`Request error`);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.6 } }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className='fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-70'
      >
        <div
          ref={popUp}
          className='bg-light border-dark h-[45vh] w-[45vw] rounded-xl border-[3px] bg-[url("/comment2.jpg")] bg-cover bg-center bg-no-repeat shadow-lg'
        >
          <div className='h-full w-full flex-col '>
            <p className='mb-28 mt-4 text-center text-xl'>{`How is it?`}</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='mx-auto h-[17rem] w-[20rem] flex-col'
            >
              <input
                type='text'
                id='text'
                className='border-dark ms-12 flex h-[42%] w-[75%] rounded-[1rem] border-[3px]'
                {...register('content', {
                  required: false,
                  maxLength: { value: 255, message: 'Max length exceeded !' },
                })}
              />
              <p className='ms-5 mt-5 text-[rgb(232,40,40)]'>
                {errors.content?.message}
              </p>
              <div className='mt-28 flex justify-center'>
                <button type='submit'>
                  <p className='uppercase'> {`send`}</p>
                </button>
              </div>
            </form>
          </div>
          <div className='flex justify-center'>
            <button type='button' onClick={handleClose}>
              <X className='h-8 w-8 cursor-pointer ' />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
