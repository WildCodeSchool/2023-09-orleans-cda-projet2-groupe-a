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
          className='m-3 mb-0 h-[15rem] w-[18rem] bg-[url("/comment.png")] bg-contain bg-no-repeat'
        >
          <div className='flex h-full w-full flex-col items-center justify-center overflow-auto text-center'>
            <Link to={`/details/${comment.cocktail_id}`}>
              <p className='mb-3 mt-10 text-sm'>{comment.cocktail_name}</p>
            </Link>
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
