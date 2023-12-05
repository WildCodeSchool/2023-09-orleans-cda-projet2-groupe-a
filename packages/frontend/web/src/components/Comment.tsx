import type { CommentProps } from '@app/types';

export default function Comment({ numberComment }: CommentProps) {
  const comments = Array.from({ length: numberComment }, (_, index) => (
    <img
      key={index}
      src='comment.png'
      className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
    />
  ));

  return <div className='flex w-full flex-wrap p-2'>{comments}</div>;
}
