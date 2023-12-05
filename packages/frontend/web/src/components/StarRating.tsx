import type { StarRatingProps } from '@app/types';

import Star from './Star';

export default function StarRating({ starCount }: StarRatingProps) {
  const stars = [];
  for (let index = 0; index < starCount; index++) {
    stars.push(<Star key={index} index={index} />);
  }

  return <div className='mt-2 flex justify-center'>{stars}</div>;
}
