import { Plus } from 'lucide-react';

import type { CocktailCommentsProps } from '@app/types';

import UseClosePopUp from '@/hooks/use-close-pop-up';

import AddComment from './AddComment';

export default function Comment({ comments }: CocktailCommentsProps) {
  const { isOpen, setIsOpen, popUp } = UseClosePopUp();

  return (
    <div className='flex w-full justify-center'>
      <div className='flex w-full flex-wrap'>
        {comments?.map((comment) => (
          <div
            key={comment.comment_id}
            className='m-3 mb-0 h-[17rem] w-[20rem] bg-[url("/comment.png")] bg-contain bg-no-repeat'
          >
            {/* <div className='w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4'> */}
            <div className='flex h-full w-full flex-col items-center justify-center overflow-auto text-center'>
              <p className='text-sm'>{`Cocktail's name`}</p>
              <div className='mb-3 flex justify-center'>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`h-[20px] w-[20px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale sm:h-[30px] sm:w-[30px] ${
                      index <= Math.floor(comment.rating_score / 2)
                        ? 'grayscale-0 '
                        : 'grayscale'
                    }`}
                  />
                ))}
              </div>
              <p className='sm:text-md mr-3 break-all text-xs leading-relaxed'>
                {comment.comment_content}
              </p>
            </div>
          </div>
          // </div>
        ))}
        <div className='m-3 h-[17rem] w-[20rem] bg-[url("/comment.png")] bg-contain bg-no-repeat'>
          <button type='button' className='h-full w-full'>
            <Plus
              onClick={() => {
                setIsOpen(true);
              }}
              color='#0E0F0F'
              className='stroke-3 m-auto h-20 w-20 cursor-pointer'
            />
          </button>
          {isOpen ? <AddComment setIsOpen={setIsOpen} popUp={popUp} /> : null}
        </div>
      </div>
    </div>
  );
}
