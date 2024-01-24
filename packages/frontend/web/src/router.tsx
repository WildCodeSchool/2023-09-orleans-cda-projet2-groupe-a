import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import AddCocktail from './pages/AddCocktail';
import Cocktails from './pages/Cocktails';
import CocktailsDetails from './pages/CocktailsDetails';
import Community from './pages/Community';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
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
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'cocktails',
        element: <Cocktails />,
      },
    ],
  },
]);

export default router;
