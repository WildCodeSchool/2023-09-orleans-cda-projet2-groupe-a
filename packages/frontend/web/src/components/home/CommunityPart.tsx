export default function CommunityPart(isHovered: { [key: number]: boolean }) {
  const hovered: { [key: number]: boolean } = isHovered;

  return (
    <div className='relative'>
      <h1
        className={`text-light ${hovered[0] ? 'animate-bounce' : ''} font-stroke-xl -rotate-17 relative top-[180px] z-50 w-[200px] text-center text-xl uppercase sm:left-[-10px] sm:top-[240px] sm:w-[300px] sm:text-[1.8rem] md:text-[2rem] lg:left-[-10px] lg:top-[280px] lg:text-[2.5rem] xl:left-[50px] xl:top-[300px] 2xl:left-[110px] 2xl:top-[370px]`}
      >
        {'community'}
      </h1>
      <img
        src={`dot/dot-1.svg`}
        className='relative h-full w-full md:left-[-20px] md:top-[-10px] lg:left-[-15px] lg:top-[5px] xl:left-[-35px] xl:top-[-5px]'
      />
      <img
        className={`${hovered[0] ? 'filter-yellow duration-250 scale-110 transition-transform ease-in-out' : ''} absolute top-[25px] cursor-pointer sm:left-[-5px] sm:top-[40px] md:left-[-5px] md:top-[40px] lg:left-[-5px] lg:top-[40px] xl:left-[30px] xl:top-[80px] 2xl:left-[90px] 2xl:top-[150px]`}
        src={`home/home-1.png`}
      />
    </div>
  );
}
