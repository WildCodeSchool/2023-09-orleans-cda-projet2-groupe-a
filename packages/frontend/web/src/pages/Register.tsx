import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const now: Date = new Date();

  const [email, setEmail] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');

  const handleClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // pour empêcher le rafraîchissement de la page.

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include', // optionnel mais indispensable pour retrouver le cookie.
        headers: {
          'content-type': 'application/json', // L'entête content-type spécifie à Express le type de contenu de la requête HTTP. Aka du JSON.
        },
        body: JSON.stringify({
          // body contient email et password. JSON.stringify convertit l'objet en chaîne JSON.
          email,
          password,
          pseudo,
          birthdate,
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
      }; // Intend to correctly type "ok". hover json ci-contre shows a promise.
      //Hence, the mention "await" preceed res.json.

      if (data.ok) {
        // User registered, loggedIn and redirected to /.
        setIsLoggedIn(true);
        navigate('/'); // si l'utilisateur est connecté, on le redirige vers la page d'accueil.
      } else {
        // User Registered but not logged in
        setIsLoggedIn(false);
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
              value={birthdate}
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
    </div>
  );
}
