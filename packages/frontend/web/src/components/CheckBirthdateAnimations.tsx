import { useAnimations } from '@/contexts/AnimationsContext';
import { useBirth } from '@/contexts/BirthContext';

type CheckBirthdateAnimationsProps = {
  readonly isUnderAge: boolean;
};

export default function CheckBirthdateAnimations({
  isUnderAge,
}: CheckBirthdateAnimationsProps) {
  const { isImageShown, isSubmitted, isModalShown, setIsModalShown } =
    useAnimations();

  const { birthdate } = useBirth();
  const minus18: Date = new Date();
  minus18.setFullYear(minus18.getFullYear() - 18);

  return (
    <>
      <div className='fixed top-1 z-40 flex h-1/5 flex-col items-center justify-center'>
        {isSubmitted && birthdate !== '' && birthdate !== null ? (
          birthdate && isUnderAge ? (
            <div className='w-7/8 h-7/8 fixed top-12 flex rounded border-2 border-red-600 bg-red-300 p-1'>
              {"Remember! No Booze 'til you're 18!"}
            </div>
          ) : (
            <div className='bg-light-orange fixed top-0 z-50 flex h-full w-full items-start justify-center overflow-y-auto p-5'>
              <div
                className='z-50 flex h-screen w-screen items-center justify-center overflow-y-auto bg-contain bg-no-repeat'
                style={{
                  backgroundImage: `url('/yes-you-can.svg')`,
                  backgroundPosition: 'center',
                }}
              >
                <div
                  className='animation-scale-up-delayed animate-fade-out z-40 mt-[32rem] h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
                  style={{ backgroundImage: `url('/wow.svg')` }}
                />
              </div>
            </div>
          )
        ) : null}
      </div>
      <div className='z-50'>
        {isImageShown && isSubmitted && birthdate !== '' && isUnderAge ? (
          <div
            className={`w-7/8 animate-fade-out ml-[5rem] flex h-screen items-center justify-center`}
          >
            <img
              src='/ouch.svg'
              alt='ouch! Not Eighteen.'
              className='w-7/8 h-7/8 ml-[5rem]'
            />
          </div>
        ) : null}
      </div>
      {isModalShown && isUnderAge ? (
        <div className='flex-end font-stroke text-light flex items-center'>
          <div className='z-40 flex h-1/6 flex-col items-center gap-6 text-4xl'>
            <div className='animate-color-pulse hover:text-dark-orange hover:bg-light-yellow m-2 rounded-[30px] border-[5px] border-transparent p-4 text-6xl font-bold transition-transform duration-500 ease-in-out  hover:rotate-1 hover:scale-110 hover:animate-none hover:justify-normal hover:border-[5px] hover:border-black hover:bg-opacity-80'>
              <a href='/virgin'>{'Grab your Mocktail!'}</a>
            </div>
            <img
              className='shadow-2x1 z-50 h-2/3 w-2/3 justify-center rounded-[90px] border-[6px] border-black object-center opacity-100 shadow-inner'
              src='alcohol-free-cocktails.webp'
              alt='redirection page for under18'
            />
            <button
              type='button'
              className='font-stroke text-light hover:text-dark-orange duration-250 flex h-[10px] w-[10px] justify-end transition-transform ease-in-out hover:scale-110'
              onClick={() => {
                setIsModalShown(false);
              }}
            >
              <div>{'X'}</div>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
