// import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';

import CheckBirthdate from '../CheckBirthdate';
import Navbar from '../Navbar';

export default function Layout() {
  // const [birthdate, setBirthdate] = useState(localStorage.getItem('birthdate'));
  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   setBirthdate(localStorage.getItem('birthdate'));
  // }, []);

  return (
    <>
      {
        // birthdate === null &&
        !isLoggedIn && <CheckBirthdate />
      }
      <Navbar />
      <Outlet />
    </>
  );
}
