import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function CheckBirthdate() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [birthdate, setBirthdate] = useState<string>('');
  const now = new Date();
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate(),
  );

  const onChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // pour empêcher le rafraîchissement de la page.

    // le fetch envoie une requête à la route /login et retourne une promesse qui est la réponse à la requête.
    // Await suspend l'exécution du code à la résolution de la promesse.
    // Param1 du fetch : adresse du serveur et route.
    // Param2: un objet contenant
    const res = await fetch(`${import.meta.env.VITE_API_URL}/checkbirthdate`, {
      method: 'POST',
      credentials: 'include', // optionnel mais indispensable pour retrouver le cookie.
      headers: {
        'content-type': 'application/json', // L'entête content-type spécifie à Express le type de contenu de la requête HTTP. Aka du JSON.
      },
      body: JSON.stringify({
        // body contient la date de naissance. JSON.stringify convertit l'objet en chaîne JSON.
        birthdate,
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
        className='absolute h-screen w-screen overflow-x-hidden bg-center bg-no-repeat'
        style={{ backgroundImage: `url('/enter.svg')` }}
      >
        <div className='flex h-screen w-screen flex-col items-center justify-center'>
          <h1 className='text-light font-stroke mb-4 mt-12 pb-6 text-center text-5xl font-bold'>
            {'Enter your birthdate'}
          </h1>
          <form
            onSubmit={onChange}
            className='m-4 flex flex-col items-center justify-center pt-[.5rem]'
          >
            <input
              className='2px border-dark h-18 z-50 m-1 rounded border-8 p-1 text-center  text-sm sm:w-8 md:w-96 md:text-3xl'
              type='birthdate'
              placeholder='Birthdate'
              value={birthdate}
              onChange={(event) => {
                setBirthdate(event.target.value);
              }}
            />
          </form>
        </div>
      </div>
      <div className='z-10 flex flex-col'>
        {birthdate !== '' && (
          <>
            {!/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
              birthdate,
            ) && (
              <div className='rounded border-2 border-red-600 bg-red-300 p-1'>
                {'Birthdate format must be YYYY-MM-DD'}
              </div>
            )}
            {new Date(birthdate) > eighteenYearsAgo && (
              <>
                <div className='rounded border-2 border-red-600 bg-red-300 p-1'>
                  {'You must be at least 18 years old'}
                </div>
                <img
                  className='absolute right-0'
                  src='/ouch.svg'
                  alt='ouch! Not Eighteen.'
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
