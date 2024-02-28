export default function Title() {
  return (
    <div
      className='shadow-card-favorite mx-auto mb-10 flex h-[13rem] w-[90vw] rounded border-[4px] border-[#FEADB3] bg-[#EA2879] bg-cover bg-center shadow-lg transition-transform ease-in-out hover:scale-110 sm:w-[70vw] md:h-[12.5rem] md:w-[24rem]'
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
