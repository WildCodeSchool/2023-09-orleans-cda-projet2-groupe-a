interface StarRatingProps {
  readonly rating: number | null | undefined;
}
export default function StarRating({ rating }: StarRatingProps) {
  return rating === null || rating === undefined ? null : (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`h-[20px] w-[20px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat grayscale sm:h-[30px] sm:w-[30px] ${
            index <= Math.floor(rating) ? 'grayscale-0 ' : 'grayscale'
          }`}
        />
      ))}
    </div>
  );
}
