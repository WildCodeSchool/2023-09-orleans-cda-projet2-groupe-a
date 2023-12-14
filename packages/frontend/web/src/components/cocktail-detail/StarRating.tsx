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

export default function StarRating({ ratings }: CocktailCommentsProps) {
  return (
    <>
      {/* {comments.map((comment) => (
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
      ))} */}
      {ratings?.map((rating) => (
        <div
          key={rating.rating_id}
          className='flex items-center justify-center'
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`h-[20px] w-[20px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale sm:h-[30px] sm:w-[30px] ${
                index <= Math.floor(rating.score / 2)
                  ? 'grayscale-0 '
                  : 'grayscale'
              }`}
            />
          ))}
        </div>
      ))}
    </>
  );
}
