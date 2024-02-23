interface UserProfileProps {
  readonly pseudo: string;
  readonly image: string;
  readonly color: string;
}

export function PublicHeader({ pseudo, image, color }: UserProfileProps) {
  return (
    <>
      <h1 className='font-stroke-title text-light pt-10 text-center text-[2rem] font-extrabold uppercase sm:mx-20 sm:pb-12 sm:pt-24 sm:text-start sm:text-[2.3rem]'>
        {`Welcome ${pseudo}`}
      </h1>
      <div className='gb-center relative flex h-[30rem] w-[100%] items-center justify-center sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6'>
        <img
          src='/profile-page/header-profile.png'
          className='absolute -top-[1rem] h-[25rem] object-contain'
        />
        <img
          src={image ? `/avatar/${image}` : '/placeholder-avatar.png'}
          alt='user image'
          className={`border-dark relative left-[1%] top-[-12%] ml-1 h-[1OOpx] w-[100px] cursor-pointer rounded-full border-[3px] bg-[#66C7FE] transition-transform ease-in-out hover:scale-110 sm:left-[1%] sm:top-[-12%] sm:h-[125px] sm:w-[125px] sm:border-[6px] md:left-[1%] md:h-[150px] md:w-[150px] lg:left-[1%] lg:h-[200px] lg:w-[200px] xl:left-[1%] xl:h-[200px] xl:w-[200px] bg-profile-picture-${color} object-cover`}
        />
      </div>
    </>
  );
}
