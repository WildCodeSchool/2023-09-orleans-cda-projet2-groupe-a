import { createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import Home from './pages/Home';
import ProfilPage from './pages/ProfilPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'profile',
    element: <ProfilPage />,
  },
  {
    path: 'shaker',
    element: <AddCocktail />,
  },
]);

export default router;
