import type { StarProps } from '@app/types';

export default function Star({ index }: StarProps) {
  return (
    <img
      src={index === 0 ? 'star-yellow.png' : 'star.png'}
      className='h-[1.7rem] w-[1.7rem]'
      alt={`Star ${index + 1}`}
    />
  );
}
