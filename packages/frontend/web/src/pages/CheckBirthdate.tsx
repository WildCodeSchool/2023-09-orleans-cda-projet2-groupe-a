import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { CurrentAgeContext } from '@/contexts/AgeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function CheckBirthdate() {
  const [birthdate, setBirthdate] = useState<string>('');
  const [isImageShown, setIsImageShown] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isUnder18, setIsUnder18] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const value = useMemo(
    () => ({
      isUnder18,
      setIsUnder18,
    }),
    [isUnder18],
  );

  // useMemo is going to memorize the eighteenYearsAgo value, as long as birthdate doesn't change.
  const eighteenYearsAgo: Date = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    // hide the image and clear the previous timer when birthdate changes.
    setIsImageShown(false);
    let timer: NodeJS.Timeout;

    if (
      birthdate !== '' &&
      new Date(birthdate).getTime() >= eighteenYearsAgo.getTime()
    ) {
      setIsImageShown(true);

      // clear the timer when the component is unmounted or if birthdate changes.
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      abortController.abort();
    };
  }, [birthdate, eighteenYearsAgo]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents refresh.
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
    setIsUnder18(true);

    if (isUnder18) {
      setTimeout(() => {
        setIsModalShown(true);
      }, 3000);
    }

    if (new Date(birthdate).getTime() < eighteenYearsAgo.getTime()) {
      <Navigate to='/nokidsallowed' />;
    } else {
      <Navigate to='/register' />;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/checkbirthdate`, {
      method: 'POST',
      credentials: 'include', // optional but essentiel to find out the cookie.
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        // body contains birthdate. JSON.stringify converts object into a JSON string.
        birthdate,
      }),
    });

    const data = (await res.json()) as {
      isLoggedIn: boolean;
    };

    if (data.isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/home'); // if the user is logged in, he's redirected to homepage.
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <CurrentAgeContext.Provider value={value}>
      <div className='bg-pastel-blue flex h-screen items-center justify-center p-5'>
        <div
          className='absolute h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
          style={{ backgroundImage: `url('/enter.svg')` }}
        >
          <div className='flex h-screen w-screen flex-col items-center justify-center'>
            <h1 className='text-light font-stroke mb-4 mt-12 pb-6 text-center text-5xl font-bold leading-normal'>
              {'Enter your birthdate'}
            </h1>
            <form
              onSubmit={handleSubmit}
              className='m-4 flex flex-col items-center justify-center pt-[.5rem]'
            >
              <input
                className='2px border-dark h-18 z-40 m-1 h-16 w-72 rounded border-[5px] p-1 text-center text-xl md:w-80 md:text-3xl'
                type='birthdate'
                placeholder='Birthdate'
                value={birthdate}
                onChange={(event) => {
                  setBirthdate(event.target.value);
                }}
                maxLength={10}
              />
              <button
                className='button border-dark mt-3 h-14 w-[288px] rounded border-[5px] bg-blue-500 p-1 text-lg font-bold text-white hover:bg-blue-700 md:w-[320px] md:text-xl'
                type='submit'
              >
                {'Register'}
              </button>
            </form>
          </div>
        </div>
        <div className='fixed top-1 z-40 flex h-1/5 flex-col items-center justify-center'>
          {isSubmitted && birthdate !== '' ? (
            <>
              {!/^(19|20)\d{2}[./-\s](0[1-9]|1[0-2])[./-\s](0[1-9]|[12]\d|3[01])$/.test(
                birthdate,
              ) && (
                <div className='fixed top-1 rounded border-2 border-red-600 bg-red-300 p-1'>
                  {'Birthdate format : YYYY MM DD'}
                </div>
              )}
              {isUnder18 ? (
                <div className='w-7/8 h-7/8 fixed top-12 flex rounded border-2 border-red-600 bg-red-300 p-1'>
                  {'Sorry! You must be at least 18 years old'}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        <div className='z-50'>
          {isImageShown && isSubmitted && birthdate !== '' ? (
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
        {isModalShown ? (
          <div className='flex-end font-stroke text-light flex items-center'>
            <div className='z-40 flex h-1/6 flex-col items-center gap-6 text-4xl'>
              <div className='hover:text-dark-orange hover:bg-light-yellow m-2 rounded-[30px] border-black p-4 text-6xl font-bold transition-transform  duration-500 ease-in-out hover:rotate-1 hover:scale-110 hover:justify-normal hover:border-[5px] hover:bg-opacity-80'>
                <a href='/virgin'>{'Grab your Mocktail!'}</a>
              </div>
              <img
                className='shadow-2x1 z-50 h-2/3 w-2/3 justify-center rounded-[90px] border-[6px] border-black object-center opacity-100 shadow-inner'
                src='./alcohol-free-cocktails.webp'
                alt='redirection page for under18'
              />
              <button
                type='button'
                className='font-stroke text-light hover:text-dark-orange duration-250 flex h-[10px] w-[10px] justify-end transition-transform ease-in-out hover:scale-110'
                onClick={() => {
                  setIsModalShown(false);
                }}
              >
                <div className=''>{'X'}</div>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </CurrentAgeContext.Provider>
  );
}
