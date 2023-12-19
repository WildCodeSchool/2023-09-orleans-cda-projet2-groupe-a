import { Navigate, createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import CheckBirthdate from './pages/CheckBirthdate';
import CocktailsDetails from './pages/CocktailsDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import NoKidsAllowed from './pages/NoKidsAllowed';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/checkbirthdate',
    element: <CheckBirthdate />,
  },
  {
    path: '/nokidsallowed', // TODO : attribuer cette page avec virgins filtrés ou autres.
    element: <NoKidsAllowed />, // Composant ébauché.
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/details',
    element: <CocktailsDetails />,
  },
  {
    path: 'shaker',
    element: <AddCocktail />,
  },
  {
    // path: 'virgin', à prévoir
    //element: <Virgin />, à prévoir
  },
]);

export default router;
