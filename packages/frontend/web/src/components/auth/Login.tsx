import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import type { AuthBody } from '@app/types';
import { loginSchema } from '@app/types';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const { register, handleSubmit, formState } = useForm<AuthBody>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Desctructure the formState object
  const { isValid, errors } = formState;

  // Submit the login form
  const onSubmit: SubmitHandler<AuthBody> = async (data) => {
    try {
      // Validation of user entered data using a validation schema

      if (isValid) {
        // Send the login request to the server
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          credentials: 'include', // Send cookies
          headers: {
            'content-type': 'application/json',
          },
          // Convert the JS object to a JSON string
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        });

        // Get the result from the server as a JS object JSON
        const resData = (await res.json()) as {
          isLoggedIn: boolean;
        };

        // If the user is logged in, redirect to the home page
        if (resData.isLoggedIn) {
          setIsLoggedIn(true);
          navigate('/');
        }
      }
    } catch {
      throw new Error('ⓘ Email or password is incorrect');
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/' />;
  }

  return (
    <div className='font-base flex h-full flex-col items-center justify-between px-20 py-10'>
      <div className='w-full'>
        <h1 className='text-center font-light tracking-widest'>{`Bienvenue sur L'ORÉAL DIAGNOSTIC `}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-40 w-full font-light tracking-widest'
        >
          <div className='mb-10'>
            <div className='flex items-center gap-2'>
              <img src='/user.svg' />
              <label
                htmlFor='email'
                className='text-divider translate-y-1 tracking-widest'
              >
                {`Email`}
              </label>
            </div>
            <input
              {...register('email')}
              type='text'
              id='email'
              className='border-divider mt-3 w-full border-b bg-transparent tracking-widest outline-none'
            />
            {errors.email && errors.email.message !== undefined ? (
              <p className='mt-1 flex'>{errors.email.message}</p>
            ) : undefined}
          </div>
          <div className='mb-10'>
            <div className='flex items-center gap-2'>
              <img src='/lock.svg' />
              <label
                htmlFor='password'
                className='text-divider translate-y-1 tracking-widest'
              >
                {`Mot de passe`}
              </label>
            </div>
            <input
              {...register('password')}
              type='password'
              id='password'
              className='border-divider mt-3 w-full border-b bg-transparent tracking-[5px] outline-none'
            />
            {errors.password && errors.password.message !== undefined ? (
              <p className='mt-1 flex'>{errors.password.message}</p>
            ) : undefined}
          </div>
          <div className='flex justify-end'>
            <Button type={'submit'}>{'connexion'}</Button>
          </div>
        </form>
      </div>

      <div className='flex-col'>
        <p className='text-center font-light'>{`Pas encore de compte?`}</p>
        <div className='mt-6 flex justify-center'>
          <Link to='/registration'>
            <Button type={'button'}>{`s'enregistrer`}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
