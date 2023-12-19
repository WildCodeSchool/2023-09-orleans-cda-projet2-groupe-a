import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { CommentsProfile } from '@app/types';

import Comments from './Comments';

interface CommentsSectionProfileProps {
  readonly comments: CommentsProfile[] | null;
}

export default function CommentsSection({
  comments,
}: CommentsSectionProfileProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const commentsReference = useRef<HTMLDivElement | null>(null);

  const onCommentsToggle = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  useEffect(() => {
    if (isOpen) {
      commentsReference.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);
  return (
    <div ref={commentsReference}>
      <h1 className='font-stroke-small-text text-light ml-7 text-xl font-extrabold uppercase lg:text-2xl'>
        {'your comments'}
      </h1>
      <div>
        <div className='ml-7 ps-2'>
          <div className='font-stroke text-light mb-10 flex text-[1.5rem] font-extrabold uppercase'>
            {isOpen ? (
              <button type='button' onClick={onCommentsToggle}>
                <Minus
                  color='#0E0F0F'
                  className='my-auto me-3 h-7 w-7 cursor-pointer stroke-[4px]'
                />
              </button>
            ) : (
              <button type='button' onClick={onCommentsToggle}>
                <Plus
                  color='#0E0F0F'
                  className='my-auto me-3 h-7 w-7 cursor-pointer stroke-[4px]'
                />
              </button>
            )}
            <h2 className='pe-2'>{`review`}</h2>
          </div>
        </div>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, height: '0rem' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: '0rem' }}
              transition={{ duration: 1 }}
              className='m-auto mb-20 flex w-[90%] flex-wrap rounded-sm object-contain uppercase sm:w-[90%]'
            >
              <div className='my-3 flex grid h-full w-full items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {comments === null ? (
                  'no comments yet'
                ) : (
                  <Comments comments={comments} />
                )}
              </div>
            </motion.div>
          ) : undefined}
        </AnimatePresence>
      </div>
    </div>
  );
}
