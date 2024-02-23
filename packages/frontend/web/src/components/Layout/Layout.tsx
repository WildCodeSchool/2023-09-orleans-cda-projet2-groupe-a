import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useAge } from '@/contexts/AgeContext';
import { useAuth } from '@/contexts/AuthContext';

import CheckBirthdate from '../CheckBirthdate';
import Navbar from '../Navbar';

export default function Layout() {
  const [birthdate, setBirthdate] = useState(
    sessionStorage.getItem('birthdate'),
  );
  const { isLoggedIn } = useAuth();
  const { storedAge } = useAge();

  useEffect(() => {
    setBirthdate(sessionStorage.getItem('birthdate'));
  }, []);

  return (
    <>
      {!isLoggedIn && !birthdate && <CheckBirthdate />}
      {storedAge
        ? sessionStorage.getItem('isUnderAge') === null && <CheckBirthdate />
        : null}
      <Navbar />
      <Outlet />
    </>
  );
}
