import { Link } from 'react-router-dom';

import type { CommentsProfile } from '@app/types';

interface CommentsProfileProps {
  readonly comments: CommentsProfile[];
}

export default function Comments({ comments }: CommentsProfileProps) {
  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.comment_id}
          className='h-[30vh] w-[35vh] border-[6px] border-black bg-[url("/comment-1.png")] bg-cover bg-center bg-no-repeat sm:h-[48.5vh] sm:w-[60vh] md:w-full'
        >
          <div className='mt-[15%] flex h-[30vh] w-[35vh] flex-col items-center sm:h-[48.5vh] sm:w-[60vh] md:mt-[20%] md:w-full'>
            <h1 className='text-md sm:mb-3 sm:text-2xl'>
              <Link to={`/details/${comment.cocktail_id}`}>
                {comment.cocktail_name}
              </Link>
            </h1>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`h-[20px] w-[20px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale sm:h-[30px] sm:w-[30px] ${
                    index <= Math.floor(comment.score / 2)
                      ? 'grayscale-0 '
                      : 'grayscale'
                  }`}
                />
              ))}
            </div>
            <div className='line-clamp-7 mt-1 h-[55px] w-[180px] overflow-auto text-center sm:mt-4 sm:h-[85px] sm:w-[280px]'>
              <p className='sm:text-md mr-3 break-all text-xs leading-relaxed'>
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
