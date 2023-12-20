export default function Cocktail() {
  return (
    <div
      className='h-screen w-screen overflow-x-hidden overflow-y-scroll bg-cover bg-center bg-no-repeat pt-16 '
      style={{ backgroundImage: `url('bg-cocktails.png')` }}
    >
      <div
        className='mx-auto flex h-[15rem] w-[90vw] rounded border-[4px] border-[#00B594] bg-[#4FD1A8] bg-cover bg-center shadow-lg sm:w-[70vw] md:h-[15rem] md:w-[32rem]'
        style={{ backgroundImage: `url('blue-dot.png')` }}
      >
        <div className='h-full w-full  '>
          <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[5rem] ps-5 text-center text-[2.5rem] font-extrabold uppercase'>{`Cocktails`}</h1>
          <div className='flex justify-end'>
            <img
              src='/cocktail-img.png'
              alt='Absinthe glass'
              className='z-20 h-[13rem] sm:h-[14.5rem] sm:w-[13rem]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
