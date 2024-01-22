import { Plus } from 'lucide-react';

import useOutsideClick from '@/hooks/use-outside-click';

import AddComment from './AddComment';

interface Comment {
  content: string;
  score: number;
  rating_id: number;
  comment_id: number;
}

interface CommentProps {
  readonly comments: Comment[] | undefined;
  readonly isReload: boolean;
  readonly setIsReload: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Comment({
  comments,
  isReload,
  setIsReload,
}: CommentProps) {
  const { isOpen, setIsOpen, refEl } = useOutsideClick<HTMLDivElement>();

  return comments === undefined ? null : (
    <div className='flex w-full justify-center'>
      <div className='my-4 flex w-full flex-wrap justify-around'>
        {comments.map((comment) => (
          <div
            key={comment.comment_id}
            className='m-3 mb-0 h-[15rem] w-[18rem] bg-[url("/comment.png")] bg-contain bg-no-repeat'
          >
            <div className='flex h-full w-full flex-col items-center justify-center overflow-auto text-center'>
              <p className='text-sm'>{`Cocktail's name`}</p>
              <div className='mb-3 flex justify-center'>
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={comment.rating_id}
                    className={`h-[20px] w-[20px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale sm:h-[30px] sm:w-[30px] ${
                      index <= Math.floor(comment.score / 2)
                        ? 'grayscale-0 '
                        : 'grayscale'
                    }`}
                  />
                ))}
              </div>
              <p className='sm:text-md mr-3 break-all text-xs leading-relaxed'>
                {comment.content}
              </p>
            </div>
          </div>
        ))}
        <div className='m-3 h-[15rem] w-[18rem] bg-[url("/comment.png")] bg-contain bg-no-repeat'>
          <button type='button' className='h-full w-full'>
            <Plus
              onClick={() => {
                setIsOpen(true);
              }}
              color='#0E0F0F'
              className='stroke-3 m-auto h-20 w-20 cursor-pointer'
            />
          </button>
          {isOpen ? (
            <AddComment
              setIsOpen={setIsOpen}
              refEl={refEl}
              setIsReload={setIsReload}
              isReload={isReload}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
