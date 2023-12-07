import { createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import Cocktails from './pages/Cocktails';
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
  {
    path: 'shaker',
    element: <AddCocktail />,
  },
  {
    path: 'cocktails',
    element: <Cocktails />,
  },
]);

export default router;
