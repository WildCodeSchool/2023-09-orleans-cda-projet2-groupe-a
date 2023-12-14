// import type { StarProps } from '@app/types';
// export default function Star({ index }: StarProps) {
//   return (
//     <img
//       src={index === 0 ? '/star-yellow.png' : '/star.png'}
//       className='h-[1.7rem] w-[1.7rem]'
//       alt={`Star ${index + 1}`}
//     />
//   );
// }
import type { CocktailCommentsProps } from '@app/types';

export default function StarRating({ comments }: CocktailCommentsProps) {
  const starCount = [1, 2, 3, 4, 5];
  return (
    <div>
      {comments?.map((comment) => (
        <div key={comment.comment_id}>
          <div className='flex justify-center'>
            {starCount.map((index) => (
              <div
                key={index}
                className={`h-[1.7rem] w-[1.7rem] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale  ${
                  index <= Math.floor(comment.rating_score / 2)
                    ? 'grayscale-0 '
                    : 'grayscale'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
