export default function ShakeItPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-navbar relative bottom-[-160%] right-[-2%] z-50 w-[200px] text-center text-xl uppercase sm:bottom-[-80px] sm:w-[300px] sm:text-2xl md:bottom-[-100px] md:text-2xl md:text-[2.5rem] lg:left-[100px] lg:top-[300px]'>
        <span className='mb-6 block'>{'shake'}</span>
        <span className='block'>{'it!'}</span>
      </h1>
      <img
        src={`dot/dot-2.svg`}
        className='relative left-[20px] top-[-30px] h-full w-full'
      />
      <img
        className='hover:filter-yellow duration-250 absolute left-[75px] top-[80px] cursor-pointer transition-transform ease-in-out hover:scale-110'
        src={`home/home-2.png`}
      />
    </div>
  );
}
