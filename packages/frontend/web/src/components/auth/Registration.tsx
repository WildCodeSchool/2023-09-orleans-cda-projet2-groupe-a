import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { RegisterBody } from '@app/types';
import { registrationSchema } from '@app/types';

import { useAuth } from '@/contexts/AuthContext';

import Button from '../Button';

const API_URL = import.meta.env.VITE_API_URL;

export default function RegistrationForm() {
  const [errorRegistration, setErrorRegistration] = useState<string>();
  // Get the navigate function from the router
  const navigate = useNavigate();

  const { setIsLoggedIn } = useAuth();

  // Destructure the useForm hook
  // Use zodResolver to validate the form
  const { register, handleSubmit, formState } = useForm<RegisterBody>({
    resolver: zodResolver(registrationSchema),
  });

  // Destructure the formState object
  const { isValid, errors } = formState;

  // onSubmit function to handle form submission
  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    try {
      if (isValid) {
        // Send a POST request to the API to register the user
        const res = await fetch(`${API_URL}/auth/registration`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            gender: data.gender,
            birthdate: data.birthdate,
            country: data.country,
            email: data.email,
            password: data.password,
          }),
        });

        const resData = (await res.json()) as {
          isLoggedIn: boolean;
        };

        if (resData.isLoggedIn) {
          setIsLoggedIn(true);
          navigate('/');
        }
      }
    } catch {
      setErrorRegistration(
        'ⓘ An error occurred during registration. Try again!',
      );
    }
  };

  return (
    <div className='font-base flex h-full flex-col items-center justify-between px-20 py-10'>
      <div className='flex h-full w-full flex-col'>
        <h1 className='font-title text-primary text-md mb-10 uppercase tracking-widest'>
          {'Créer un nouveau compte'}
        </h1>
        <div className='flex grow flex-col gap-2 rounded-lg'>
          <div className='flex h-full flex-col items-center'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex h-full w-full flex-col justify-between font-light tracking-widest'
            >
              <div>
                <div className='mb-10 flex gap-6'>
                  <div className='h-full w-full'>
                    <label
                      htmlFor='lastname'
                      className='text-divider translate-y-1 tracking-widest'
                    >
                      {`Nom`}
                    </label>
                    <input
                      {...register('lastname')}
                      type='text'
                      id='lastname'
                      className='border-divider mt-3 w-full border-b bg-transparent tracking-widest outline-none'
                    />
                    {errors.lastname &&
                    errors.lastname.message !== undefined ? (
                      <p className='mt-2 flex text-xs text-red-500'>
                        {errors.lastname.message}
                      </p>
                    ) : undefined}
                  </div>
                  <div className='w-full'>
                    <label
                      htmlFor='firstname'
                      className='text-divider translate-y-1 tracking-widest'
                    >
                      {`Prénom`}
                    </label>
                    <input
                      {...register('firstname')}
                      type='text'
                      id='firstname'
                      className='border-divider mt-3 w-full border-b bg-transparent tracking-widest outline-none'
                    />
                    {errors.firstname &&
                    errors.firstname.message !== undefined ? (
                      <p className='mt-2 flex text-xs text-red-500'>
                        {errors.firstname.message}
                      </p>
                    ) : undefined}
                  </div>
                </div>

                <div className='mb-10 flex items-end gap-6'>
                  <div className='w-full'>
                    <label
                      htmlFor='birthdate'
                      className='text-divider translate-y-[10px] tracking-widest'
                    >
                      {`Date de naissance`}
                    </label>
                    <input
                      {...register('birthdate')}
                      type='date'
                      id='birthdate'
                      className='border-divider mt-3 w-full border-b bg-transparent tracking-widest outline-none'
                    />
                    {errors.birthdate &&
                    errors.birthdate.message !== undefined ? (
                      <p className='mt-2 flex text-xs text-red-500'>
                        {errors.birthdate.message}
                      </p>
                    ) : undefined}
                  </div>
                  <div className='flex w-full translate-y-[-1px] flex-col'>
                    <label
                      htmlFor='gender'
                      className='text-divider tracking-widest'
                    >
                      {`Genre`}
                    </label>
                    <select
                      name='gender'
                      id='gender'
                      className='border-divider mt-3 translate-y-[1px] border-b bg-transparent tracking-widest outline-none'
                    >
                      <option {...register('gender')} value='male'>
                        {`Homme`}
                      </option>
                      <option {...register('gender')} value='female'>
                        {`Femme`}
                      </option>
                      <option {...register('gender')} value='other'>
                        {`Autre`}
                      </option>
                    </select>
                    {errors.gender && errors.gender.message !== undefined ? (
                      <p className='mt-2 flex text-xs text-red-500'>
                        {errors.gender.message}
                      </p>
                    ) : undefined}
                  </div>
                </div>

                <div className='mb-10 w-1/2 pr-3'>
                  <label
                    htmlFor='country'
                    className='text-divider translate-y-1 tracking-widest'
                  >
                    {`Pays`}
                  </label>
                  <input
                    {...register('country')}
                    type='text'
                    id='country'
                    className='border-divider mt-3 w-full border-b bg-transparent tracking-widest outline-none'
                  />
                  {errors.country && errors.country.message !== undefined ? (
                    <p className='mt-2 flex text-xs text-red-500'>
                      {errors.country.message}
                    </p>
                  ) : undefined}
                </div>

                <div className='mb-10'>
                  <div className='flex items-center gap-2'>
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
                    <p className='mt-2 flex text-xs text-red-500'>
                      {errors.email.message}
                    </p>
                  ) : undefined}
                </div>

                <div>
                  <div className='flex items-center gap-2'>
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
                    className='border-divider mt-3 w-full border-b bg-transparent tracking-widest outline-none'
                  />
                  {errors.password && errors.password.message !== undefined ? (
                    <p className='mt-2 flex text-xs text-red-500'>
                      {errors.password.message}
                    </p>
                  ) : undefined}
                </div>
                {Boolean(errorRegistration) && <p>{errorRegistration}</p>}
              </div>

              <div className='flex flex-col'>
                <Button type='submit'>{'Validate'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
