import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import CheckBirthdate from '../CheckBirthdate';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';

export default function Layout() {
  const [birthdate, setBirthdate] = useState(localStorage.getItem('birthdate'));
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setBirthdate(localStorage.getItem('birthdate'));
  }, []);
  console.log('salut', isLoggedIn);

  return (
    <>
      {birthdate === null && !isLoggedIn && <CheckBirthdate />}
      <Navbar />
      <Outlet />
    </>
  );
}
