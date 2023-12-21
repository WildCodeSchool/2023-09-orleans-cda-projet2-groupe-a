import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAge } from '@/contexts/AgeProviderContext';
import { useAuth } from '@/contexts/AuthContext';

// These two consts below do not need and function. They don'h have to be into fuction CheckBirthdate.
const now: Date = new Date();
const eighteenYearsAgo: Date = new Date(
  now.getFullYear() - 18,
  now.getMonth(),
  now.getDate(),
);

export default function CheckBirthdate() {
  const navigate = useNavigate();
  const [birthdate, setBirthdate] = useState<string>('');
  const [isImageShown, setIsImageShown] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { obtainedBirthday, setObtainedBirthday } = useAge();

  // useEffect qui permet d'ajouter la classe 'overflow - hidden' au body quand le composant est monté

  useEffect(() => {
    // Adds class 'overflow-hidden' to the body when the component is mounted
    document.body.classList.add('overflow-hidden');
    return () => {
      // removes class 'overflow-hidden' from the body when the component is unmounted
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents refresh.
    setIsSubmitted(true);
    // setTimeout(() => {
    //   setIsSubmitted(false);
    // }, 7000);
    // setObtainedBirthday(birthdate);
    document.body.classList.remove('overflow-hidden');

    if (
      birthdate !== '' &&
      new Date(birthdate).getTime() <= eighteenYearsAgo.getTime()
    ) {
      // User is over 18.
      setObtainedBirthday(birthdate);
      if (isLoggedIn) {
        navigate('/'); // redirects to the / page.
      } else {
        navigate('/register');
      }
    } else if (
      birthdate !== '' &&
      new Date(birthdate).getTime() >= eighteenYearsAgo.getTime()
    ) {
      // User is under 18.
      setObtainedBirthday(birthdate);
      setIsImageShown(true);
      setTimeout(() => {
        setIsModalShown(true);
      }, 3000);
      //navigate('/virgin'); // redirects to /virgin page when this page exists.
    }

    if (birthdate === '') {
      setTimeout(() => {
        setIsModalShown(true);
      }, 3000);
    } else if (new Date(birthdate).getTime() < eighteenYearsAgo.getTime()) {
      navigate('/virgin');
    } else {
      navigate('/register');
    }

    if (birthdate && isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/'); // if the user is logged in, he's redirected to homepage.
    } else {
      return null;
    }
  };

  // useEffect qui permet d'ajouter obtainedBirthday au localstorage
  // pour y accéder de page en page une fois que l'user l'a renseignée.

  useEffect(() => {
    if (obtainedBirthday !== undefined) {
      localStorage.setItem('obtainedBirthday', obtainedBirthday);
    }
  }, [obtainedBirthday]);

  return (
    <div className='bg-pastel-blue flex h-screen items-center justify-center overflow-y-auto p-5'>
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
                if (/^[\d\s/-]*$/.test(event.target.value)) {
                  setBirthdate(event.target.value);
                }
              }}
              maxLength={10}
            />
            <button
              className='button border-dark mt-3 h-14 w-[288px] rounded border-[5px] bg-blue-500 p-1 text-lg font-bold text-white hover:bg-blue-700 md:w-[320px] md:text-xl'
              type='submit'
            >
              {'Submit'}
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
            {obtainedBirthday != null &&
            obtainedBirthday &&
            new Date(obtainedBirthday).getTime() <
              now.getTime() - eighteenYearsAgo.getTime() ? (
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
            <div className='hover:text-dark-orange hover:bg-light-yellow m-2 rounded-[30px] border-[5px] border-transparent p-4 text-6xl font-bold transition-transform duration-500  ease-in-out hover:rotate-1 hover:scale-110 hover:justify-normal hover:border-[5px] hover:border-black hover:bg-opacity-80'>
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
    </div>
  );
}
