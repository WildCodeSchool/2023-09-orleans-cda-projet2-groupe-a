export default function Virgin() {
  return (
    <div
      className='z-20 flex h-screen w-screen items-start justify-center bg-cover p-5'
      style={{ backgroundImage: `url('/bg-virgin.svg')` }}
    >
      <div className='mx-auto flex h-[13rem] w-[90vw] bg-card-virgin-orange border-4 border-light-orange rounded-lg p-3 shadow-2xl sm:w-[70vw] md:h-[13rem] md:w-[27rem]'>
        <h1 className='font-stroke text-light absolute z-50 m-auto flex stroke-[2rem] py-[4rem] text-4xl ps-5 text-center text-[2.5rem] font-extrabold uppercase'>{'Virgin'}</h1>
        <div
          className='z-50 h-[200px] w-[350px] bg-center bg-no-repeat'
          style={{ backgroundImage: `url('/feeding-bottle-cocktails-2.svg')` }}
        />
      </div>
    </div>
  );
}
