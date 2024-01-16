import { createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import AddCocktail from './pages/AddCocktail';
import CocktailsDetails from './pages/CocktailsDetails';
import Community from './pages/Community';
import Home from './pages/Home';
import ConnectProfilePage from './pages/ProfilePage';
import ProfilePage from './pages/PublicProfilePage';

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
        path: 'profile',
        element: <ConnectProfilePage />,
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
    ],
  },
]);

export default router;
