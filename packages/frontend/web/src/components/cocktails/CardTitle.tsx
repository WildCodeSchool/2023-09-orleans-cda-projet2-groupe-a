export default function CardTitle() {
  return (
    <div
      className='shadow-card-cocktail mx-auto flex h-[13rem] w-[90vw] rounded border-[4px] border-[#00B594] bg-[#4FD1A8] bg-cover bg-center shadow-lg transition-transform ease-in-out hover:scale-110 sm:w-[70vw] md:h-[12.5rem] md:w-[24rem]'
      style={{ backgroundImage: `url('blue-dot.png')` }}
    >
      <div className='relative h-full w-full'>
        <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] ps-7 text-center text-[2.5rem] font-extrabold uppercase'>{`Cocktails`}</h1>
        <div className='flex justify-end'>
          <img
            src='/cocktail-img.png'
            alt='Absinthe glass'
            className='absolute z-20 h-[13rem] sm:h-[13rem] sm:w-[11rem]'
          />
        </div>
      </div>
    </div>
  );
}
