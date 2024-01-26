interface FireLevelProps {
  readonly totalDegree: number;
}

export default function FireLevel({ totalDegree }: FireLevelProps) {
  let imagesToDisplay;

  if (totalDegree >= 0 && totalDegree < 15) {
    imagesToDisplay = (
      <img src='/form-cocktail/fire-level.png' alt='Fire Level' />
    );
  } else if (totalDegree >= 15 && totalDegree < 30) {
    imagesToDisplay = (
      <>
        <img src='/form-cocktail/fire-level.png' alt='Fire Level' />
        <img src='/form-cocktail/fire-level.png' alt='Fire Level' />
      </>
    );
  } else if (totalDegree >= 30 && totalDegree <= 45) {
    imagesToDisplay = (
      <>
        <img src='/form-cocktail/fire-level.png' alt='Fire Level' />
        <img src='/form-cocktail/fire-level.png' alt='Fire Level' />
        <img src='/form-cocktail/fire-level.png' alt='Fire Level' />
      </>
    );
  }

  return (
    <div className='ms-20 mt-1 flex h-[75px] w-[80px] sm:ms-10'>
      {imagesToDisplay}
    </div>
  );
}
