import { createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import CocktailsDetails from './pages/CocktailsDetails';
import Community from './pages/Community';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'profile/:id',
    element: <ProfilePage />,
  },
  {
    path: '/cocktail-details/:id',
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
]);

export default router;
