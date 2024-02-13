export default function CocktailsPart(isHovered: { [key: number]: boolean }) {
  const hovered: { [key: number]: boolean } = isHovered;

  return (
    <div className='relative'>
      <h1
        className={`${hovered[4] ? 'animate-bounce' : ''} text-light font-stroke-xl relative left-[10px] top-[20px] z-50 ml-16 w-[200px] text-xl uppercase hover:animate-bounce sm:left-[15px] sm:top-[280px] sm:w-[300px] sm:text-[1.8rem] md:left-[0px] md:top-[250px] md:text-[2rem] lg:left-[-15px] lg:top-[20px] lg:text-[2.5rem] 2xl:left-[50px] 2xl:top-[65px]`}
      >
        {`cocktails`}
      </h1>
      <img
        src={`dot/dot-5.svg`}
        className='relative h-full w-full md:left-[10px]'
      />
      <img
        className={`${hovered[4] ? 'filter-green duration-250 scale-110 transition-transform ease-in-out' : ''} absolute left-[5px] top-[35px] cursor-pointer sm:left-[15px] sm:top-[15px] md:left-[15px] md:top-[15px] lg:top-[50px] xl:left-[30px] 2xl:left-[85px] 2xl:top-[95px]`}
        src={`home/home-5.png`}
      />
    </div>
  );
}
