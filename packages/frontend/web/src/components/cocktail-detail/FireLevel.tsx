interface FireLevelProps {
  readonly totalDegree: number;
}

export default function FireLevel({ totalDegree }: FireLevelProps) {
  let fireLevelCount = 0;

  if (totalDegree >= 0 && totalDegree < 15) {
    fireLevelCount = 1;
  } else if (totalDegree >= 15 && totalDegree < 30) {
    fireLevelCount = 2;
  } else if (totalDegree >= 30) {
    fireLevelCount = 3;
  }

  const imagesToDisplay = [];
  for (let index = 0; index < fireLevelCount; index++) {
    imagesToDisplay.push(
      <img key={index} src='/form-cocktail/fire-level.png' alt='Fire Level' />,
    );
  }

  return (
    <div className='ms-20 mt-1 flex h-[75px] w-[80px] sm:ms-10'>
      {imagesToDisplay}
    </div>
  );
}
