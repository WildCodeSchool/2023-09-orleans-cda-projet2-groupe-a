import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { AgeProvider, useAge } from '@/contexts/AgeProviderContext';

import CheckBirthdate from '../../pages/CheckBirthdate';

const Layout = () => {
  const location = useLocation();
  const { obtainedBirthday } = useAge();
  console.log(obtainedBirthday);

  return (
    <>
      {typeof obtainedBirthday === 'string' ||
      location.pathname === '/register' ||
      location.pathname === '/login' ? null : (
        <CheckBirthdate />
      )}
      <Outlet />
    </>
  );
};

export default Layout;
