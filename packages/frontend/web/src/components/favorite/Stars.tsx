interface StarsProps {
  readonly ratings_average: string | undefined;
}

export default function Stars({ ratings_average }: StarsProps) {
  return (
    <div className='flex justify-center'>
      {Number(ratings_average) === 0 ? (
        <p className='text-sm font-extralight'>{'not grade yet'}</p>
      ) : (
        [1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`h-[30px] w-[30px] bg-[url('/star-yellow.png')] bg-cover bg-no-repeat ${
              index <= Math.round(Number(ratings_average))
                ? 'grayscale-0 '
                : 'grayscale'
            }`}
          />
        ))
      )}
    </div>
  );
}
