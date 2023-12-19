export default function FavoritesPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-navbar -rotate-17 relative top-[-4%] z-50 ml-16 w-[200px] text-lg uppercase sm:left-[35px] sm:top-[-55%] sm:w-[300px] sm:text-2xl md:left-[10%] md:top-[-50%] md:text-[2.5rem] lg:-left-[-20px] lg:top-[180px]'>
        {'favorites'}
      </h1>
      <img
        src={`dot/dot-6.svg`}
        className='relative left-[20px] h-full w-full'
      />
      <img
        className='hover:filter-pink duration-250 absolute left-[50px] top-[10px] cursor-pointer transition-transform ease-in-out hover:scale-110'
        src={`home/home-6.png`}
      />
    </div>
  );
}
