import { createBrowserRouter } from 'react-router-dom';

import AddCocktail from './pages/AddCocktail';
import CocktailsDetails from './pages/CocktailsDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/details/:id',
    element: <CocktailsDetails />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
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
    path: '/login',
    element: <Login />,
  },
]);

export default router;
