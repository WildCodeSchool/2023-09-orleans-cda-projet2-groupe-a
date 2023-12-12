import type { UserProfile } from '@app/types';

export function Header(data: UserProfile) {
  const { pseudo } = data;
  return (
    <>
      <h1 className='font-stroke-profile-main text-light pt-10 text-center text-[2rem] font-extrabold uppercase sm:mx-10 sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {`Welcome ${pseudo}`}
      </h1>
      <div className="gb-center relative right-[54%] flex h-[75%] w-[200%] items-center justify-center bg-[url('/profile-page/profile-header.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6">
        <img
          src='/profile-page/bubble.png'
          alt=''
          className='absolute right-[18%] top-[25%] h-[450px] w-[450px] rotate-[80deg] lg:right-[10%] lg:top-[25%] lg:h-[450px] lg:w-[450px] lg:rotate-[35deg]'
        />
        <div className='md:w-[500px]] absolute right-[18%] top-[27%] flex h-[450px] w-[450px] rotate-[25deg] items-center justify-center lg:right-[10%] lg:top-[27%] lg:h-[450px] lg:w-[450px] lg:rotate-[-20deg]'>
          <div className='flex flex-col gap-3'>
            <div>
              <h2 className='uppercase'>{'email:'}</h2>
              <p className='lg:text-md md:text-sm'>{'email.fake@gmail.com'}</p>
              <p className='text-xs'>{'change your email'}</p>
            </div>
            <div>
              <h2 className='uppercase'>{'password:'}</h2>
              <p>{'*********'}</p>
              <p className='text-xs'>{'change your password'}</p>
            </div>
            <p className='text-xs'>{'change your avatar'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
