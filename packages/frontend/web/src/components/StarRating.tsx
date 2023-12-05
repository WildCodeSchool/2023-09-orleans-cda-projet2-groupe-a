import type { StarRatingProps } from '@app/types';

import Star from './Star';

export default function StarRating({ starCount }: StarRatingProps) {
  return (
    <div className='mt-2 flex justify-center'>
      {Array.from({ length: starCount }, (_, index) => (
        <Star key={index} index={index} />
      ))}
    </div>
  );
}
