import { PenLine } from 'lucide-react';

interface ConnectUserProfileProps {
  readonly pseudo: string;
  readonly email: string;
  readonly image: string;
  readonly color: string;
  readonly setIsOpen: (value: boolean) => void;
}

export function Header({
  pseudo,
  image,
  color,
  email,
  setIsOpen,
}: ConnectUserProfileProps) {
  return (
    <>
      <h1 className='font-stroke-title text-light pt-10 text-center text-[2rem] font-extrabold uppercase sm:mx-20 sm:pb-12 sm:pt-24 sm:text-start sm:text-[2.3rem]'>
        {`Welcome ${pseudo}`}
      </h1>
      <div className='gb-center relative flex h-[30rem] w-[100%] items-center justify-center sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6'>
        <img
          src='profile-page/header-profile.png'
          className='absolute h-[25rem] object-cover'
        />
        <img
          src={image ? `/avatar/${image}` : '/placeholder-avatar.png'}
          alt='user image'
          onClick={() => {
            setIsOpen(true);
          }}
          className={`border-dark relative left-[2rem] ml-1 h-[200px] w-[200px] cursor-pointer rounded-full border-[3px] bg-[#2AB4FF] transition-transform ease-in-out hover:scale-110 sm:border-[6px] bg-profile-picture-${color} object-cover`}
        />
        <img
          src='/profile-page/bubble.png'
          alt=''
          className='absolute right-[18%] top-[25%] h-[450px] w-[450px] rotate-[80deg] lg:right-[10%] lg:top-[25%] lg:h-[450px] lg:w-[450px] lg:rotate-[35deg]'
        />
        <div
          className='md:w-[500px]] absolute right-[18%] top-[27%] flex h-[450px] w-[450px] rotate-[25deg] cursor-pointer items-center justify-center lg:right-[10%] lg:top-[27%] lg:h-[450px] lg:w-[450px] lg:rotate-[-20deg]'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className='flex flex-col gap-3'>
            <div>
              <h2 className='uppercase'>{'email:'}</h2>
              <p className='lg:text-md md:text-sm'>{email}</p>
            </div>
            <div>
              <h2 className='uppercase'>{'password:'}</h2>
              <p>{'******'}</p>
            </div>
            <p className='flex gap-1 text-sm uppercase'>
              {'change it !'}
              <PenLine />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
