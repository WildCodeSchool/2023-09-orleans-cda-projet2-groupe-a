interface UserProfileProps {
  readonly pseudo: string;
  readonly image: string;
  readonly color: string;
}

export function PublicHeader({ pseudo, image, color }: UserProfileProps) {
  return (
    <>
      <h1 className='font-stroke-title text-light pt-10 text-center text-[2rem] font-extrabold uppercase sm:mx-10 sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {`Welcome ${pseudo}`}
      </h1>
      <div className="gb-center relative right-[51%] flex h-[75%] w-[200%] items-center justify-center bg-[url('/profile-page/header-profile.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6">
        <img
          src={`/avatar/${image}`}
          alt='user image'
          className={`border-dark relative left-[1%] top-[-31%] ml-1 h-[150px] w-[150px] cursor-pointer rounded-full border-[4px] sm:left-[1%] sm:top-[-33%] sm:h-[125px] sm:w-[125px] sm:border-[6px] md:left-[1%] md:top-[-29%] md:h-[150px] md:w-[150px] lg:left-[1%] lg:top-[-22%] lg:h-[200px] lg:w-[200px] xl:left-[2%] xl:top-[-16%] xl:h-[250px] xl:w-[250px] 2xl:left-[1%] 2xl:top-[-10%] 2xl:h-[300px] 2xl:w-[300px] bg-profile-picture-${color} object-cover`}
        />
      </div>
    </>
  );
}
