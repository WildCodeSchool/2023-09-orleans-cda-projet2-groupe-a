import { createBrowserRouter } from 'react-router-dom';

import CocktailsDetails from './pages/CocktailsDetails';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/details',
    element: <CocktailsDetails />,
  },
]);

export default router;
