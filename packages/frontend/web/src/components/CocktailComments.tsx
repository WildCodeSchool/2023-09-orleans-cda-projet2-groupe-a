import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function CocktailComments() {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleToggle = () => {
    setIsCommentsOpen(!isCommentsOpen);
  };

  const starCount = 5;

  const stars = [];
  for (let index = 0; index < starCount; index++) {
    stars.push(
      <img
        key={index}
        src={index === 0 ? 'star-yellow.png' : 'star.png'}
        className='h-[1.7rem] w-[1.7rem]'
        alt={`Star ${index + 1}`}
      />,
    );
  }

  return (
    <div>
      <div className='ps-2'>
        <div className='font-stroke text-light mb-10 flex text-[1.5rem] font-extrabold uppercase'>
          {isCommentsOpen ? (
            <button type='button' onClick={handleToggle}>
              <Minus
                color='#0E0F0F'
                className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
                style={{ strokeWidth: '4' }}
              />
            </button>
          ) : (
            <button type='button' onClick={handleToggle}>
              <Plus
                color='#0E0F0F'
                className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
                style={{ strokeWidth: '4' }}
              />
            </button>
          )}
          <h2 className='pe-2'>{`review`}</h2>
          <div className='my-auto flex'>{stars}</div>
        </div>
      </div>
      <AnimatePresence>
        {isCommentsOpen ? (
          <motion.div
            initial={{ opacity: 0, height: '0rem' }}
            animate={{ opacity: 1, height: '22rem' }}
            exit={{ opacity: 0, height: '0rem' }}
            transition={{ duration: 1 }}
            className='border-dark bg-pastel-green m-auto mb-20 w-[90%] rounded-sm border-[3px] uppercase sm:flex sm:flex-wrap'
          >
            <img
              src='comment.png'
              className='w-full p-2 sm:w-[50%] md:w-[33.3%]'
            />
            <img
              src='comment.png'
              className='w-full p-2 sm:w-[50%] md:w-[33.3%]'
            />
            <img
              src='comment.png'
              className='w-full p-2 sm:w-[50%] md:w-[33.3%]'
            />
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
}
