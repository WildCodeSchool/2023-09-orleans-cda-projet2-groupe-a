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
      <h1 className='font-stroke-title text-light pt-10 text-center text-[2rem] font-extrabold uppercase sm:mx-10 sm:pt-16 sm:text-start sm:text-[2.5rem]'>
        {`Welcome ${pseudo}`}
      </h1>
      <div className="gb-center relative right-[51%] flex h-[75%] w-[200%] items-center justify-center bg-[url('/profile-page/header-profile.png')] bg-contain bg-no-repeat sm:right-[0%] sm:m-2 sm:w-[97%] lg:m-6">
        <img
          src={`/avatar/${image}`}
          alt='user image'
          onClick={() => {
            setIsOpen(true);
          }}
          className={`border-dark relative left-[1%] top-[-31%] ml-1 h-[150px] w-[150px] cursor-pointer rounded-full border-[4px] sm:left-[1%] sm:top-[-33%] sm:h-[125px] sm:w-[125px] sm:border-[6px] md:left-[1%] md:top-[-29%] md:h-[150px] md:w-[150px] lg:left-[1%] lg:top-[-22%] lg:h-[200px] lg:w-[200px] xl:left-[2%] xl:top-[-16%] xl:h-[250px] xl:w-[250px] 2xl:left-[1%] 2xl:top-[-10%] 2xl:h-[300px] 2xl:w-[300px] bg-profile-picture-${color} object-cover`}
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
