export default function ProfilPage() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll bg-[url('profil-page/bg-profil-page.png')] bg-cover ">
      <h1 className='font-stroke text-light mx-10 pt-10 text-center text-[2rem] font-extrabold uppercase sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {'Welcome Justin'}
      </h1>
      <div className="gb-center relative right-[55%] flex h-[75%] w-[200%] items-center justify-center bg-[url('profil-page/profil-header.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-10">
        <img
          className='absolute left-[43%] top-[7%] w-[20%] sm:top-[6%] md:top-[8%] lg:top-[10%] '
          src='profil-page/avatar.png'
          alt=''
        />
        <div className="absolute h-[60%] w-[60%] bg-[url('profil-page/bubble.png')] bg-no-repeat" />
      </div>
    </div>
  );
}
