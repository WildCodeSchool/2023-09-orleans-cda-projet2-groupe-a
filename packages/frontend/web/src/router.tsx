import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AddCocktail from './pages/AddCocktail';
import CocktailsDetails from './pages/CocktailsDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import NoKidsAllowed from './pages/NoKidsAllowed';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/nokidsallowed', // TODO : attribuer cette page avec virgins filtrés ou autres.
        element: <NoKidsAllowed />, // Composant ébauché.
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
        // path: 'virgin', à prévoir
        //element: <Virgin />, à prévoir
      },
    ],
  },
]);

export default router;
