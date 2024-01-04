import { Outlet } from 'react-router-dom';

import CheckBirthdate from '../Check-birthdate/CheckBirthdate';

export default function LayoutLoggedIn() {
  return (
    <>
      <CheckBirthdate />
      <Outlet />
    </>
  );
}

// layout when user is Logged In. This is gonna concern only
// register and login pages, because there's no need to ask
// for birthdate since it's already stored in the database if user is logged in.
// If user is not registerd, register form asks for his birthdate.
