export default function CocktailCard() {
  const starCount = 5;

  const stars = [];
  for (let index = 0; index < starCount; index++) {
    stars.push(
      <img
        key={index}
        src={index === 0 ? 'star-yellow.png' : 'star.png'}
        className='h-[1.7rem] w-[1.7rem]'
        alt={`Star ${index + 1}`}
      />,
    );
  }

  return (
    <div className='relative -top-8'>
      <div className='border-dark bg-card-pink absolute -top-3 left-10 z-30 m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
      <div className='border-dark bg-pastel-brown absolute -top-6 left-6  m-auto my-20 h-[21rem] w-[18rem] rounded-sm border-[3px]' />
      <div className='border-dark bg-card-pink-dark absolute left-14 z-[50] my-20 h-[21rem] w-[18rem] rounded-sm border-[3px] uppercase'>
        <img
          src='cocktail-placeholder.png'
          alt='Cocktail picture'
          className='border-dark mx-auto mt-8 h-[13rem] w-[14rem] rounded-sm border-[3px] object-cover'
        />
        <div>
          <p className='font-stroke text-light text-md mx-4 mt-3 text-center'>{`Cocktail's name`}</p>
          <div className='mt-2 flex justify-center'>{stars}</div>
        </div>
      </div>
    </div>
  );
}
