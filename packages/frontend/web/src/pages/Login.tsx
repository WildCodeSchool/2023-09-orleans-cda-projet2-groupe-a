import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevents default behaviour that would refresh the page.

    // Fetch sends request to /login route and returns a promise that is the answer to that request.
    // Await suspends code execution as soon as the promise is resolved.
    // Param1 from fetch : server adress & route.
    // Param2: Object ocntaining :
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      credentials: 'include', // Optional but essential to find out cookie.
      headers: {
        'content-type': 'application/json', // The "content-type" header specifies Express what kind of content is in the http request. Aka JSON.
      },
      body: JSON.stringify({
        // body contains email & password. JSON.stringify converts the objet into a JSON string.
        email,
        password,
      }),
    });

    const data = (await res.json()) as {
      isLoggedIn: boolean;
    }; // Hover .json shows that it's a promise. la souris au-dessus de json ci-contre montre que c'est d'une promesse. Hence, the mention "await" preceed res.json.

    if (data.isLoggedIn) {
      setIsLoggedIn(true);
      navigate('/home'); // If the user is logged in, he's redirected towards homepage.
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
          <h1 className='text-light font-stroke justify mb-4 text-center text-5xl font-bold'>
            {'Login'}
          </h1>
          <form
            onSubmit={onSubmit}
            className='z-50 m-10 flex flex-col items-center gap-2'
          >
            <input
              className='2px border-dark m-1 rounded border-4 p-1 text-center text-sm sm:w-8 md:w-96 md:text-xl'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className='2px border-dark m-1 rounded border-4 p-1 text-center text-sm sm:w-8 md:w-96 md:text-xl'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              className='button border-dark m-1 rounded border-4 bg-blue-500 p-1 text-sm font-bold text-white hover:bg-blue-700 sm:w-8 md:w-96 md:text-xl'
              type='submit'
            >
              {'Login'}
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
        {password == '' && (
          <div className='mb-3 rounded border-2 border-red-600 bg-red-300 p-1'>
            {'Password field must be completed'}
          </div>
        )}
      </div>
    </div>
  );
}
