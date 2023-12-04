import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

import { useDisclosure } from '@app/frontend-shared';

import Comment from './CommentComponent';
import StarRating from './StarRating';

export default function CocktailComments() {
  const { isOpen: isCommentsOpen, onToggle: onCommentsToggle } =
    useDisclosure(false);

  return (
    <div>
      <div className='ps-2'>
        <div className='font-stroke text-light mb-10 flex text-[1.5rem] font-extrabold uppercase'>
          {isCommentsOpen ? (
            <button type='button' onClick={onCommentsToggle}>
              <Minus
                color='#0E0F0F'
                className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
                style={{ strokeWidth: '4' }}
              />
            </button>
          ) : (
            <button type='button' onClick={onCommentsToggle}>
              <Plus
                color='#0E0F0F'
                className='stroke-4 my-auto me-3 h-7 w-7 cursor-pointer'
                style={{ strokeWidth: '4' }}
              />
            </button>
          )}
          <h2 className='pe-2'>{`review`}</h2>
          <div className='my-auto flex'>
            <StarRating starCount={5} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isCommentsOpen ? (
          <motion.div
            initial={{ opacity: 0, height: '0rem' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: '0rem' }}
            transition={{ duration: 1 }}
            className='border-dark bg-pastel-green m-auto mb-20 flex w-[70%] flex-wrap rounded-sm border-[3px] object-contain uppercase sm:w-[90%]'
          >
            <Comment numberComment={3} />
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
}
