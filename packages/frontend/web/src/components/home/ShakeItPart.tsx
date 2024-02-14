export default function ShakeItPart() {
  return (
    <div className='relative'>
      <h1
        className={`text-light font-stroke-xl relative left-[0px] top-[170px] z-50 w-[200px] text-center text-xl uppercase hover:animate-bounce group-hover:animate-bounce sm:left-[-10px] sm:top-[220px] sm:w-[300px] sm:text-[1.8rem] md:left-[-10px] md:top-[220px] md:text-2xl md:text-[2rem] lg:left-[30px] lg:top-[250px] lg:text-[2.5rem] xl:left-[100px] xl:top-[300px] 2xl:left-[190px] 2xl:top-[400px]`}
      >
        <span className='block sm:mb-2 md:mb-6'>{'shake'}</span>
        <span className='block'>{'it!'}</span>
      </h1>
      <img
        src={`dot/dot-2.svg`}
        className='relative top-[-30px] h-full w-full md:left-[-10px] lg:left-[20px] lg:top-[-40px] xl:top-[-30px]'
      />
      <img
        className={`group-hover:filter-yellow duration-250 absolute left-[0px] top-[30px] cursor-pointer transition-transform ease-in-out group-hover:scale-110 sm:left-[-10px] sm:top-[30px] md:left-[-10px] md:top-[30px] lg:left-[10px] xl:left-[75px] xl:top-[80px] 2xl:left-[160px] 2xl:top-[150px]`}
        src={`home/home-2.png`}
      />
    </div>
  );
}
