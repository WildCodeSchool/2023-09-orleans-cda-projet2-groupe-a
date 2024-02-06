interface FireLevelProps {
  readonly totalDegree: number;
}

export default function FireLevel({ totalDegree }: FireLevelProps) {
  const fireLevelCount = Math.min(Math.ceil(totalDegree / 15), 3);

  const imagesToDisplay = Array.from({ length: fireLevelCount }, (_, index) => (
    <img key={index} src='/form-cocktail/fire-level.png' alt='Fire Level' />
  ));

  return (
    <div className='ms-20 mt-1 flex h-[75px] w-[80px] sm:ms-10'>
      {imagesToDisplay}
    </div>
  );
}
