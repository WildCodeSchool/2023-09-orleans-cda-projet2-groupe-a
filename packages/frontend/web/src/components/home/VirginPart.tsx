export default function VirginPart(isHovered: { [key: number]: boolean }) {
  const hovered: { [key: number]: boolean } = isHovered;

  return (
    <div className='relative'>
      <h1
        className={`${hovered[3] ? 'animate-bounce' : ''} text-light font-stroke-xl md:rotate-17 relative left-[-10px] top-[150px] z-50 rotate-12 text-center text-xl uppercase hover:animate-bounce sm:left-[-30px] sm:top-[180px] sm:text-[1.8rem] md:left-[-20px] md:top-[220px] md:text-[2rem] lg:left-[-30px] lg:top-[250px] lg:text-[2.5rem] xl:top-[300px] 2xl:top-[350px]`}
      >
        {`virgin`}
      </h1>
      <img
        src={`dot/dot-4.svg`}
        className='relative left-[-5px] top-[-10px] h-full w-full sm:bottom-[10px] sm:left-[-20px] md:left-[-10px] lg:bottom-[40px] lg:left-[-5px]'
      />
      <img
        className={`${hovered[3] ? 'filter-green duration-250 scale-110 transition-transform ease-in-out' : ''} absolute left-[0px] top-[15px] rotate-6 cursor-pointer sm:left-[-10px] md:left-0 lg:top-[30px] 2xl:top-0`}
        src={`home/home-4.png`}
      />
    </div>
  );
}
