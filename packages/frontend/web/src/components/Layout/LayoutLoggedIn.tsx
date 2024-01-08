import { Outlet } from 'react-router-dom';

export default function LayoutLoggedIn() {
  return <Outlet />;
}

// layout when user is Logged In. This is going to concern only
// register and login pages, because there's no need to ask
// for birthdate since it's already stored in the database when user is logged in.
// If user is not registered, register form asks for his birthdate.
