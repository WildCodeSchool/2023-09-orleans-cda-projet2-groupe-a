import { createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'add-cocktail',
    element: <AddCocktail />,
  },
]);

export default router;
