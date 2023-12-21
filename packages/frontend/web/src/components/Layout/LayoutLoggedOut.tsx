import { Outlet } from 'react-router-dom';

export default function LayoutLoggedOut() {
  return <Outlet />;
}

// layout when user is not Logged In. This is gonna concern every page
// for user can navigate everywhere on the website, taking into account
// that he's under 18 or over 18 years.
