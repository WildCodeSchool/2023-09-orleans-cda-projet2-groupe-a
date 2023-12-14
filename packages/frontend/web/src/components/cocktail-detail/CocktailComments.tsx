import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDisclosure } from '@app/frontend-shared';
import type { CommentsProps } from '@app/types';

import Comment from './Comment';
import StarRating from './StarRating';

export default function CocktailComments() {
  const [comments, setComments] = useState<CommentsProps[]>();
  const { id } = useParams();

  const { isOpen: isCommentsOpen, onToggle: onCommentsToggle } =
    useDisclosure(false);

  const fetchComments = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();

      setComments(data.comments);
      // console.log(data.comments);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchComments(
      `${import.meta.env.VITE_API_URL}/comment/${id}`,
      signal,
    ).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [id]);

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
            <StarRating comments={comments} />
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
            className='border-dark bg-pastel-green m-auto mb-20 flex w-[70%] flex-wrap rounded-sm border-[3px] object-contain sm:w-[90%] md:w-[90%]'
          >
            <Comment comments={comments} />
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
}
