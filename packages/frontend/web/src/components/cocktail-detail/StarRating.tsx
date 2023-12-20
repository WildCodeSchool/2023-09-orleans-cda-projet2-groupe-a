export interface StarRatingProps {
  readonly ratings: StarRating[] | undefined;
}

export type StarRating = {
  rating_id: number;
  score: number;
  user_id: number;
  cocktail_id: number;
};

export default function StarRating({ ratings }: StarRatingProps) {
  return (
    <div>
      {ratings?.map((rating) => (
        <div
          key={rating.rating_id}
          className='flex items-center justify-center'
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={rating.rating_id}
              className={`h-[20px] w-[20px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale sm:h-[30px] sm:w-[30px] ${
                index <= Math.floor(rating.score / 2)
                  ? 'grayscale-0 '
                  : 'grayscale'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
