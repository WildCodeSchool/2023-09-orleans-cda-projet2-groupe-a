import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  // TODO : Si logged in, rediriger vers la partie "virgin".

  if (!isLoggedIn) {
    // ajouter un setTimeOut ? Pour rediriger après ? Voir redirection vers homepage "virgin".
    return <Navigate to='/register' />;
  }

  return (
    <div className='bg-pastel-pink relative flex h-screen bg-opacity-25'>
      <h1 className='text-light font-stroke absolute right-20 top-20 mt-5 -rotate-12 text-center text-5xl font-bold'>
        {'No Kids allowed!'}
      </h1>
      <img
        className='w-25 h-2/3 pl-5 opacity-100'
        src='./feeding-bottle-background.svg'
        alt='Feeding-Bottle-for-under18'
      />
      <img
        className='mr-20 h-screen w-1/2 object-cover opacity-100'
        src='./mom-said-no.png'
        alt='Mom said no'
      />
    </div>
  );
}
