export default function ProfilesPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-navbar relative top-[-60%] z-50 mb-16 w-[200px] text-center text-xl uppercase sm:top-[20px] sm:w-[300px] md:top-[-60px] md:text-2xl md:text-[2.5rem] lg:left-[60px] lg:top-[320px]'>
        {'profile'}
      </h1>
      <img
        src={`dot/dot-3.svg`}
        className='relative left-[35px] top-[-80px] h-full w-full'
      />
      <img
        className='hover:filter-blue duration-250 absolute left-[50px] top-[120px] cursor-pointer transition-transform ease-in-out hover:scale-110'
        src={`home/home-3.png`}
      />
    </div>
  );
}
