export default function ProfilPage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('profil-page/bg-profil-page.png')] bg-cover ">
      <h1 className='font-stroke-profil-main text-light mx-10 pt-10 text-center text-[2rem] font-extrabold uppercase sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {'Welcome Justin'}
      </h1>
      <div className="gb-center relative right-[55%] flex h-[75%] w-[200%] items-center justify-center bg-[url('profil-page/profil-header.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-10">
        <img
          className='absolute left-[41%] top-[7%] w-[20%] sm:top-[6%] md:top-[8%] lg:top-[10%] '
          src='profil-page/avatar.png'
          alt=''
        />
        <div className="absolute right-[5%] top-[-5%] h-[80%] w-[35%] bg-[url('profil-page/bubble.png')] bg-cover bg-no-repeat" />
      </div>
      <div className='mt-[px] flex w-screen flex-col items-center'>
        <div className="z-20 h-[400px] w-[600px] bg-[url('profil-page/miss-hold-it.png')] bg-cover" />
        <div className='bg-light border-dark relative top-[-60px] z-10 h-[800px] w-[80%] overflow-y-visible border-[6px]'>
          {' '}
        </div>
      </div>
    </div>
  );
}
