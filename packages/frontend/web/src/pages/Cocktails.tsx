export default function Cocktail() {
  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16 '
      style={{ backgroundImage: `url('bg-cocktails.png')` }}
    >
      <div className='relative m-auto h-[13rem] w-[90%] rounded border-[3px] border-[#00B594] bg-[#4FD1A8] shadow-lg sm:h-[15rem] sm:w-[32rem]'>
        <h1 className='font-stroke text-light center absolute left-10 top-9 z-50 m-auto flex stroke-[2rem] pt-10 text-[2.5rem] font-extrabold uppercase sm:text-[3rem]'>{`Cocktails`}</h1>
        <img
          src='/cocktail-img.png'
          alt='Absinthe glass'
          className='absolute left-[15rem] z-20 h-[13rem] w-[12rem] sm:h-[14.5rem] sm:w-[13rem]'
        />
        <img
          src='/blue-dot.png'
          alt='Dots decoration'
          className='absolute z-10 mx-auto h-[12.5rem] w-[28rem] sm:h-[14.5rem] sm:w-[32rem]'
        />
      </div>
    </div>
  );
}
