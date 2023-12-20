export default function ProfilesPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-xl relative top-[220px] z-50 mb-16 w-[200px] text-center text-xl uppercase sm:left-[15px] sm:top-[260px] sm:w-[300px] sm:text-[1.8rem] md:left-[60px] md:top-[280px] md:text-[2rem] lg:left-[25px] lg:top-[250px] lg:text-[2.5rem] xl:left-[60px] xl:top-[300px] 2xl:left-[140px] 2xl:top-[370px]'>
        {'profile'}
      </h1>
      <img
        src={`dot/dot-3.svg`}
        className='relative left-[-10px] top-[-45px] h-full w-full sm:left-[5px] sm:top-[-35px] md:left-[15px] md:top-[-50px] lg:left-[20px] lg:top-[-90px] xl:left-[35px] xl:top-[-80px]'
      />
      <img
        className='hover:filter-blue duration-250 absolute left-[0px] top-[100px] cursor-pointer transition-transform ease-in-out hover:scale-110 sm:left-[10px] sm:top-[110px] md:left-[30px] md:top-[130px] lg:top-[80px] xl:left-[50px] xl:top-[100px] 2xl:left-[120px] 2xl:top-[170px]'
        src={`home/home-3.png`}
      />
    </div>
  );
}
