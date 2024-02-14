import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

// Input de la page cocktail-detail
export type InputCocktailForm = {
  anecdote?: string;
  file?: string;
  content?: string;
  score?: number;
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [hoveredStars, setHoveredStars] = useState(0);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const handleStarHover = (hoveredCount: number) => {
    setHoveredStars(hoveredCount);
  };

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<InputCocktailForm>({
    defaultValues: {
      content: '',
    },
  });

  const allErrors = [
    {
      condition: errors.score?.type === 'required',
      message: errors.score?.message,
    },
    {
      condition: errors.content?.type === 'required',
      message: errors.content?.message,
    },
    {
      condition: errors.score?.type === 'validate',
      message: errors.score?.message,
    },
    {
      condition: errors.content?.type === 'maxLength',
      message: errors.content?.message,
    },
    {
      condition: errors.content?.type === 'minLength',
      message: errors.content?.message,
    },
  ];

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
    setValue('score', indexStar);
    setClicked(clickStates);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleErrorSubmit = () => {
    const scoreValue = watch('score');

    if (scoreValue === undefined) {
      setError('score', { type: 'required', message: 'please give a grade' });
    } else if (
      typeof scoreValue === 'number' &&
      scoreValue >= 1 &&
      scoreValue <= 5
    ) {
      clearErrors('score');
    } else {
      setError('score', {
        type: 'validate',
        message: 'must be between 1 and 5',
      });
    }
  };
  console.log(errors);

  const onSubmit = async (data: InputCocktailForm) => {
    data = { ...data, score: watch('score') };
    try {
      const response = await fetch(`/api/comment/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.ok === true) {
        setIsOpen(false);
        setIsReload(!isReload);
      } else if (responseData.message === 'not connected') {
        navigate('/login');
      }
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
                <div className='absolute left-[15%] sm:left-[30%] md:left-[35%] lg:left-[40%] xl:left-[40%] 2xl:left-[45%]'>
                  {allErrors.map(
                    (error, index) =>
                      error.condition && (
                        <p key={index} className='mb-2 text-center'>
                          {error.message}
                        </p>
                      ),
                  )}
                </div>
                <input
                  type='text'
                  id='text'
                  placeholder='Add your comment!'
                  className={`border-dark ms-10 mt-[10.5rem] h-[12rem] w-[80%] rounded-[1rem] border-[4px] px-5 sm:ms-12 sm:h-[42%]`}
                  {...register('content', {
                    required: {
                      value: true,
                      message: 'please write a comment !',
                    },
                    minLength: {
                      value: 1,
                      message: 'Min length not reached !',
                    },
                    maxLength: {
                      value: 255,
                      message: 'Max length exceeded !',
                    },
                  })}
                />
                <div className='flex w-full justify-center'>
                  <button
                    type='submit'
                    onClick={() => {
                      handleErrorSubmit();
                    }}
                  >
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
