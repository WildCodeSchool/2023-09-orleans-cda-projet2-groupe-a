export default function CocktailsPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-navbar relative left-[2%] top-[310%] z-50 ml-16 w-[200px] text-xl uppercase sm:left-[12%] sm:top-[350%] sm:w-[300px] sm:text-2xl md:bottom-[-30%] md:left-[-10px] md:text-[2.5rem] lg:bottom-[-100px] lg:top-[20px]'>
        {`cocktails`}
      </h1>
      <img
        src={`dot/dot-5.svg`}
        className='relative left-[10px] h-full w-full'
      />
      <img
        className='hover:filter-green duration-250 absolute left-[30px] top-[50px] cursor-pointer transition-transform ease-in-out hover:scale-110'
        src={`home/home-5.png`}
      />
    </div>
  );
}
