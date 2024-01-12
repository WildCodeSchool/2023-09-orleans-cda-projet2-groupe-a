import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckBirthdateAnimations from '@/components/CheckBirthdateAnimations';
import { useAnimations } from '@/contexts/AnimationsContext';
import { useAuth } from '@/contexts/AuthContext';

const now: Date = new Date();

export default function Register() {
  const minus18: Date = new Date();
  minus18.setFullYear(minus18.getFullYear() - 18);
  const registeredBirthdate = localStorage.getItem('birthdate') || null;
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const { setIsImageShown, setIsSubmitted, setIsModalShown, isWow, setIsWow } =
    useAnimations();

  const handleClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents refresh.
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 1500);
    document.body.classList.remove('overflow-hidden');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include', // optionnal but essential in order to retrieve the cookie.
        headers: {
          'content-type': 'application/json', // Header contains the type of content of the HTTP request. Aka JSON.
        },
        body: JSON.stringify({
          // body contains email & password. JSON.stringify converts the objet into JSON string.
          email,
          password,
          pseudo,
          birthdate,
        }),
      });

      const isUnderAge =
        birthdate && birthdate !== ''
          ? new Date(birthdate).getTime() >= minus18.getTime()
          : true;

      const data = (await res.json()) as {
        ok: boolean;
      }; // Intend to correctly type "ok". hover json ci-contre shows a promise.
      //Hence, the mention "await" preceed res.json.

      if (data.ok && !isUnderAge) {
        // User registered, loggedIn and redirected to /.
        setIsLoggedIn(true);
        setTimeout(() => {
          if (!isWow) {
            setIsWow(true);
          }
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }, 700);
        }, 1200);
        navigate('/'); // If user is logged in, he's redirected towards homepage.
      } else if (data.ok && isUnderAge) {
        document.body.classList.add('overflow-hidden');
        setIsWow(false);
        setIsImageShown(true);
        setTimeout(() => {
          setIsModalShown(true);
        }, 2500);
        // User Registered but not logged in
        setIsLoggedIn(true);
        navigate('/virgin');
      }
    } catch {
      console.error('There was an error registering.');
    }
  };

  return (
    <div className='bg-pastel-blue z-20 flex h-screen items-center justify-center p-5'>
      <div
        className='absolute z-40 h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
        style={{ backgroundImage: `url('/enter.svg')` }}
      >
        <div className='z-50 flex h-screen w-screen flex-col items-center justify-center'>
          <h1 className='text-light font-stroke mt-10 text-center text-5xl font-bold'>
            {'Register'}
          </h1>
          <form
            onSubmit={handleClick}
            className='z-50 flex flex-col items-center justify-center pt-[3.5rem]'
          >
            <input
              className='2px border-dark m-1 gap-2 rounded border-[5px] p-1 text-center text-sm md:w-96 md:text-xl'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 gap-2 rounded border-[5px] p-1 text-center text-sm md:w-96 md:text-xl'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 gap-2 rounded border-[5px] p-1 text-center text-sm md:w-96 md:text-xl'
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 gap-2 rounded border-[5px] p-1 text-center text-sm md:w-96 md:text-xl'
              type='pseudo'
              placeholder='Pseudo'
              value={pseudo}
              onChange={(event) => {
                setPseudo(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 rounded border-[5px] p-1 text-center text-sm md:w-96 md:text-xl'
              type='date'
              min='1900-01-01'
              max={now.toISOString().split('T')[0]} // returns today's date, formatted to YYYY-MM-DD.
              placeholder='Birthdate'
              defaultValue={
                registeredBirthdate === null || undefined
                  ? ''
                  : registeredBirthdate
              }
              onChange={(event) => {
                setBirthdate(event.target.value);
              }}
              maxLength={10}
            />
            <button
              className='button border-dark m-1 w-[305px] rounded border-[5px] bg-blue-500 p-1 text-sm font-bold text-white hover:bg-blue-700 md:w-96 md:text-xl'
              type='submit'
            >
              {'Register'}
            </button>
          </form>
        </div>
      </div>
      <div className='fixed top-1 z-40 flex h-1/5 flex-col items-start justify-center'>
        {email !== '' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
          <div className='xxs:text-xs mb-3 mt-[70px] rounded border-2 border-red-600 bg-red-300 p-1 sm:text-base'>
            {'example@example.com'}
          </div>
        )}
        {password !== '' && password.length <= 10 && (
          <div className='xxs:text-xs my-1 mb-3 rounded border-2 border-red-600 bg-red-300 p-1 sm:text-base'>
            {'Password must be at least 10 characters long'}
          </div>
        )}
        {confirmPassword !== '' && confirmPassword !== password && (
          <div className='xxs:text-xs my-1 mb-3 rounded border-2 border-red-600 bg-red-300 p-1 sm:text-base'>
            {'Confirm Password must match Password'}
          </div>
        )}
        {pseudo !== '' && pseudo.length < 5 && (
          <div className='xxs:text-xs my-1 mb-3 rounded border-2 border-red-600 bg-red-300 p-1 sm:text-base'>
            {'Pseudo must be at least 5 characters long'}
          </div>
        )}
      </div>
      <CheckBirthdateAnimations />
    </div>
  );
}
