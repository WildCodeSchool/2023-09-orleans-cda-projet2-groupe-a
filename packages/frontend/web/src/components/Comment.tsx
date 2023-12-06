import type { CommentProps } from '@app/types';

export default function Comment({ numberComment }: CommentProps) {
  return (
    <div className='flex w-full flex-wrap p-2'>
      {Array.from({ length: numberComment }, (_, index) => (
        <img
          key={index}
          src='comment.png'
          className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
        />
      ))}
    </div>
  );
}
