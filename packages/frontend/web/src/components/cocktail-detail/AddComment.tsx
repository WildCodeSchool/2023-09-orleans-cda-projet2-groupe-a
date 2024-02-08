import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

// Input de la page cocktail-detail
export type InputCocktailForm = {
  anecdote?: string;
  file?: string;
  content?: string;
};

interface AddCommentProps {
  readonly setIsOpen: Dispatch<SetStateAction<boolean>>;
  readonly refEl: RefObject<HTMLDivElement>;
  readonly isReload: boolean;
  readonly setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddComment({
  refEl,
  setIsOpen,
  isReload,
  setIsReload,
}: AddCommentProps) {
  const { id } = useParams();
  const [hoveredStars, setHoveredStars] = useState(0);
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarHover = (hoveredCount: number) => {
    setHoveredStars(hoveredCount);
  };

  const handleStarClick = (
    event: { preventDefault: () => void },
    indexStar: number,
  ) => {
    event.preventDefault();
    const clickStates = [...clicked];
    for (let index = 0; index < 5; index++) {
      index <= indexStar
        ? (clickStates[index] = true)
        : (clickStates[index] = false);
    }

    setClicked(clickStates);
  };

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
      await fetch(`/api/comment/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setIsOpen(false);
      setIsReload(!isReload);
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
        className='fixed inset-0 z-[99] flex-col items-center justify-center bg-black bg-opacity-70 shadow-md'
      >
        <div className='font-stroke text-light hover:text-dark-orange duration-250 mt-24 cursor-pointer text-center text-[2rem] transition-transform ease-in-out hover:scale-110'>
          <p>{`How is it?`}</p>
        </div>
        <div ref={refEl}>
          <div className='my-4 flex justify-center'>
            {[1, 2, 3, 4, 5].map((index) => (
              <Star
                key={index}
                className={`${
                  (clicked[0] && index === 0) || hoveredStars > index
                    ? 'fill-dark-orange'
                    : 'fill-light hover:fill-dark-orange duration-250'
                } h-[3.5rem] w-[3.5rem] cursor-pointer stroke-[2px] transition-transform ease-in-out hover:scale-110`}
                onClick={(event) => {
                  handleStarClick(event, index);
                }}
                onMouseEnter={() => {
                  handleStarHover(index + 1);
                }}
                onMouseLeave={() => {
                  handleStarHover(hoveredStars);
                }}
              />
            ))}
          </div>
          <div className='flex justify-center'>
            <div className='bg-light border-dark h-[32rem] w-[90%] rounded-xl border-[3px] bg-[url("/comment.jpg")] bg-cover bg-center bg-no-repeat shadow-md sm:w-[40rem] '>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='mx-auto sm:h-[25rem] sm:w-[25rem] '
              >
                <input
                  type='text'
                  id='text'
                  placeholder='Add your comment!'
                  className='border-dark ms-10 mt-[10.5rem] h-[12rem] w-[80%] rounded-[1rem] border-[4px] px-5 sm:ms-12 sm:h-[42%]'
                  {...register('content', {
                    required: false,
                    maxLength: {
                      value: 255,
                      message: 'Max length exceeded !',
                    },
                  })}
                />
                <p className='ms-5 mt-5 text-[rgb(232,40,40)]'>
                  {errors.content?.message}
                </p>
                <div className='flex w-full justify-center'>
                  <button type='submit'>
                    <p className='border-dark hover:bg-dark-orange duration-250 mt-16 rounded border-[3px] p-2 uppercase shadow-sm transition-transform ease-in-out hover:scale-110 sm:mt-24'>
                      {`send`}
                    </p>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='flex justify-center'>
            <button type='button' onClick={handleClose}>
              <div className='font-stroke text-light hover:text-dark-orange duration-250 mt-8 cursor-pointer text-[2rem] transition-transform ease-in-out hover:scale-110'>
                {'X'}
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
