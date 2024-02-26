export default function Title() {
  return (
    <div
      className='mx-auto flex h-[13rem] w-[90vw] rounded border-[4px] border-[#FEADB3] bg-[#EA2879] bg-cover bg-center shadow-lg sm:w-[70vw] md:h-[13rem] md:w-[27rem]'
      style={{ backgroundImage: `url('/dot-favorites.png')` }}
    >
      <div className='relative h-full w-full'>
        <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] ps-10 text-center text-[2.5rem] font-extrabold uppercase'>{`Favorites`}</h1>
        <div className='flex justify-end'>
          <img
            src='home/home-6.png'
            alt='booze image'
            className='absolute z-20 h-[13rem] sm:h-[13rem] sm:w-[13rem]'
          />
        </div>
      </div>
    </div>
  );
}
