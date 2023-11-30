import { createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'cocktail-form',
    element: <AddCocktail />,
  },
]);

export default router;
