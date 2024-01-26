import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckBirthdateAnimations from '@/components/CheckBirthdateAnimations';
import { useAnimations } from '@/contexts/AnimationsContext';
import { useBirth } from '@/contexts/BirthContext';

// These two consts below do not need and function.
// They don't need to be inside function CheckBirthdate.
const now: Date = new Date();
const minus18: Date = new Date();
minus18.setFullYear(minus18.getFullYear() - 18);

export default function CheckBirthdate() {
  const navigate = useNavigate();
  const { setIsImageShown, setIsSubmitted, setIsModalShown, isWow, setIsWow } =
    useAnimations();

  const { birthdate, setBirthdate } = useBirth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect qui permet d'ajouter la classe 'overflow - hidden' au body quand le composant est monté
  useEffect(() => {
    // Adds class 'overflow-hidden' to the body when the component is mounted
    document.body.classList.add('overflow-hidden');
    return () => {
      // removes class 'overflow-hidden' from the body when the component is unmounted
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // useEffect that stores birthdate in the localstorage
  // so that browser memorize it and user doesn't have to enter it again.
  useEffect(() => {
    if (birthdate !== undefined && birthdate !== '') {
      localStorage.setItem('birthdate', birthdate);
    }
  }, [birthdate]);

  // variable that stores by default the fact that user is under age.
  const isUnderAge =
    birthdate && birthdate !== ''
      ? new Date(birthdate).getTime() >= minus18.getTime()
      : true;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents refresh.
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 1500);
    document.body.classList.remove('overflow-hidden');

    if (birthdate === undefined) {
      throw new Error('Birthdate is undefined');
    }

    if (birthdate && isUnderAge) {
      document.body.classList.add('overflow-hidden');
      setIsImageShown(true);
      setTimeout(() => {
        setIsModalShown(true);
        setIsModalOpen;
      }, 2500);
      if (isModalOpen) {
        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/register');
        }, 1000);
      }
    } else {
      setTimeout(() => {
        if (!isWow) {
          setIsWow(true);
        }
        setTimeout(() => {
          document.body.classList.add('overflow-hidden');
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        }, 700);
      }, 1200);
    }
  };

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
              type='date'
              min='1920-01-01'
              max={now.toISOString().split('T')[0]} // returns today's date, formatted to YYYY-MM-DD.
              placeholder='Birthdate'
              defaultValue={birthdate}
              onChange={(event) => {
                setBirthdate(event.target.value);
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
      <CheckBirthdateAnimations isUnderAge={isUnderAge} />
    </div>
  );
}
