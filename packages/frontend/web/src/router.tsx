import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AddCocktail from './pages/AddCocktail';
import CocktailsDetails from './pages/CocktailsDetails';
import Community from './pages/Community';
import Home from './pages/Home';
import Login from './pages/Login';
import NoKidsAllowed from './pages/NoKidsAllowed';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/nokidsallowed', // TODO : attribuer cette page avec virgins filtrés ou autres.
        element: <NoKidsAllowed />, // Composant ébauché.
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />,
      },
      {
        path: '/details/:id',
        element: <CocktailsDetails />,
      },
      {
        path: 'shaker',
        element: <AddCocktail />,
      },
      // {
      // path: 'virgin', à prévoir
      // element: <Virgin />, à prévoir
      // },
      {
        path: '/cocktail-details/:id',
        element: <CocktailsDetails />,
      },
      {
        path: 'community',
        element: <Community />,
      },
    ],
  },
]);

export default router;
