import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // pour empêcher le rafraîchissement de la page.

    // le fetch envoie une requête à la route /login et retourne une promesse qui est la réponse à la requête.
    // Await suspend l'exécution du code à la résolution de la promesse.
    // Param1 du fetch : adresse du serveur et route.
    // Param2: un objet contenant
    const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      credentials: 'include', // optionnel mais indispensable pour retrouver le cookie.
      headers: {
        'content-type': 'application/json', // L'entête content-type spécifie à Express le type de contenu de la requête HTTP. Aka du JSON.
      },
      body: JSON.stringify({
        // body contient email et password. JSON.stringify convertit l'objet en chaîne JSON.
        email,
        password,
      }),
    });

    const data = (await res.json()) as {
      isLoggedIn: boolean;
    }; // la souris au-dessus de json ci-contre montre que c'est d'une promesse. D'où await devant.

    if (data.isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/home'); // si l'utilisateur est connecté, on le redirige vers la page d'accueil.
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='bg-pastel-blue flex h-screen items-center justify-center p-5'>
      <div
        className='absolute z-40 h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
        style={{ backgroundImage: `url('/enter.svg')` }}
      >
        <div className='flex h-screen w-screen flex-col items-center justify-center'>
          <h1 className='text-light font-stroke text-center  text-5xl font-bold'>
            {'Register'}
          </h1>
          <form
            onSubmit={onSubmit}
            className='m-4 flex flex-col items-center justify-center pt-[3.5rem]'
          >
            <input
              className='2px border-dark m-1 gap-2 rounded border-4 p-1 text-center text-sm sm:w-8 md:w-96 md:text-xl'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 gap-2 rounded border-4 p-1 text-center text-sm sm:w-8 md:w-96 md:text-xl'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 gap-2 rounded border-4 p-1 text-center text-sm sm:w-8 md:w-96 md:text-xl'
              type='password'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 rounded border-4 p-1 text-center text-sm  sm:w-8 md:w-96 md:text-xl'
              type='birthdate'
              placeholder='Birthdate'
              value={birthdate}
              onChange={(event) => {
                setBirthdate(event.target.value);
              }}
            />
            <button
              className='button border-dark m-1 rounded border-4 bg-blue-500 p-1 text-sm font-bold text-white hover:bg-blue-700 sm:w-8 md:w-96 md:text-xl'
              type='submit'
            >
              {'Register'}
            </button>
          </form>
        </div>
      </div>
      <div className='z-50'>
        {email !== '' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
          <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1'>
            {'example@example.com'}
          </div>
        )}
        {confirmPassword !== '' && confirmPassword !== password && (
          <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1'>
            {'Confirm Password must match Password'}
          </div>
        )}
        {birthdate !== '' &&
          !/^\d{4}-\d{2}-\d{2}$/.test(birthdate) &&
          !/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
            birthdate,
          ) && (
            <div className='rounded border-2 border-red-600 bg-red-300 p-1'>
              {'Birthdate format must be YYYY-MM-DD'}
            </div>
          )}
      </div>
    </div>
  );
}
