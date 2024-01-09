import { Outlet } from 'react-router-dom';

import CheckBirthdate from '../CheckBirthdate';
import Navbar from '../Navbar';

export default function Layout() {
  const birthdate = localStorage.getItem('birthdate');

  return (
    <>
      {birthdate === null && <CheckBirthdate />}
      <Navbar />
      <Outlet />
    </>
  );
}
