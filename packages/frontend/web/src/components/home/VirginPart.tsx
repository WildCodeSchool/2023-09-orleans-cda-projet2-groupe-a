export default function VirginPart() {
  return (
    <div className='relative'>
      <h1 className='text-light font-stroke-navbar relative bottom-[-125%] z-50 rotate-12 text-center text-xl uppercase sm:bottom-[-130%] sm:text-2xl md:relative md:bottom-[-150%] md:left-[-20%] md:mb-20 md:text-[2.5rem] lg:left-[-30px] lg:top-[350px]'>
        {`virgin`}
      </h1>
      <img
        src={`dot/dot-4.svg`}
        className='relative bottom-[40px] left-[-5px] h-full w-full'
      />
      <img
        className='hover:filter-green duration-250 absolute top-[50px] rotate-6 cursor-pointer transition-transform ease-in-out hover:scale-110'
        src={`home/home-4.png`}
      />
    </div>
  );
}
