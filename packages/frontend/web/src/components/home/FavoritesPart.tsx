export default function FavoritesPart(isHovered: { [key: number]: boolean }) {
  const hovered: { [key: number]: boolean } = isHovered;

  return (
    <div className='relative'>
      <h1
        className={`${hovered[5] ? 'animate-bounce' : ''} text-light font-stroke-xl -rotate-17 relative left-[15px] top-[130px] z-50 ml-16 w-[200px] text-lg uppercase hover:animate-bounce sm:left-[35px] sm:top-[160px] sm:w-[300px] sm:text-2xl md:left-[10px] md:top-[170px] md:text-[2rem] lg:-left-[5px] lg:top-[180px] lg:text-[2.5rem] xl:-left-[10px] xl:top-[180px] 2xl:left-[60px] 2xl:top-[250px]`}
      >
        {'favorites'}
      </h1>
      <img
        src={`dot/dot-6.svg`}
        className='relative h-full w-full md:left-[10px] lg:left-[20px]'
      />
      <img
        className={`${hovered[5] ? 'filter-pink duration-250 scale-110 transition-transform ease-in-out' : ''} absolute left-[10px] top-[10px] cursor-pointer sm:left-[80px] sm:top-[80px] sm:w-[220px] md:left-[55px] md:top-[40px] md:w-[280px] lg:left-[60px] lg:top-[40px] xl:left-[50px] 2xl:left-[140px] 2xl:top-[120px]`}
        src={`home/home-6.png`}
      />
    </div>
  );
}
