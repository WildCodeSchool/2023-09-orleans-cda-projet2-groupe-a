export default function CommunityPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-navbar -rotate-17 relative bottom-[-230%] z-50 w-[200px] text-center text-xl uppercase  sm:w-[300px] sm:text-2xl md:bottom-[-60px] md:left-[8px] md:text-2xl md:text-[2.5rem] lg:left-[50px] lg:top-[300px]'>
        {'community'}
      </h1>
      <img
        src={`dot/dot-1.svg`}
        className='relative left-[-35px] top-[-5px] h-full w-full'
      />
      <img
        className='hover:filter-yellow duration-250 absolute left-[30px] top-[80px] cursor-pointer transition-transform ease-in-out hover:scale-110'
        src={`home/home-1.png`}
      />
    </div>
  );
}
