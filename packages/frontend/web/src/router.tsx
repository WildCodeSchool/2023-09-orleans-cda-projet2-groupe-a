import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import AddCocktail from './pages/AddCocktail';
import CocktailsDetails from './pages/CocktailsDetails';
import Community from './pages/Community';
import Home from './pages/Home';
import Login from './pages/Login';
import NoKidsAllowed from './pages/NoKidsAllowed';
import Register from './pages/Register';
import Virgin from './pages/Virgin';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        // path: 'profile/:id',
        // element: <ProfilePage />,
      },
      {
        path: '/details/:id',
        element: <CocktailsDetails />,
      },
      {
        path: 'shaker',
        element: <AddCocktail />,
      },
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'virgin',
        element: <Virgin />,
      },
    ],
  },
]);

export default router;
