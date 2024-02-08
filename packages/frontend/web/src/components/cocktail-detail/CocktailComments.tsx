import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDisclosure } from '@app/frontend-shared';

import Comment from './Comment';
import StarRating from './StarRating';

interface CocktailComments {
  content: string;
  comment_id: number;
  user_id: number;
  cocktail_id: number;
  comment_user: string;
  numberComment: number;
  score: number;
  rating_id: number;
}

export default function CocktailComments() {
  const [comments, setComments] = useState<CocktailComments[]>();
  const [ratings, setRatings] = useState<CocktailComments[]>();
  const { id } = useParams();

  const { isOpen: isCommentsOpen, onToggle: onCommentsToggle } =
    useDisclosure(false);

  const [isReload, setIsReload] = useState(false);

  const fetchComments = async (url: string, signal: AbortSignal) => {
    const response = await fetch(url, {
      signal,
    });
    if (response.ok) {
      const data = await response.json();
      setComments(data.commentsByUserIdCocktailId);
      setRatings(data.ratings);
    } else {
      console.error(`Request error: ${response.status}`);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchComments(`/api/comment/${id}`, signal).catch((error) => {
      console.error(error);
    });

    return () => {
      controller.abort();
    };
  }, [id, isReload]);

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
            <StarRating ratings={ratings} />
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
            className='border-dark bg-pastel-green m-auto mb-20 flex max-w-[80%] flex-wrap rounded-sm border-[3px] object-contain lg:max-w-[100%] '
          >
            <Comment
              comments={comments}
              setIsReload={setIsReload}
              isReload={isReload}
            />
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </div>
  );
}
