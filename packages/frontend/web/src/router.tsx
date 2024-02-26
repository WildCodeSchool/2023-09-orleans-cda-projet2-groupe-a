import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound';
import ShowTeam from './components/ShowTeam';
import AddCocktail from './pages/AddCocktail';
import Cocktails from './pages/Cocktails';
import CocktailsDetails from './pages/CocktailsDetails';
import Community from './pages/Community';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import NoKidsAllowed from './pages/NoKidsAllowed';
import ProfilePage from './pages/ProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';
import Register from './pages/Register';
import Virgin from './pages/Virgin';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
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
        path: 'profile/:id',
        element: <PublicProfilePage />,
      },
      {
        path: 'profile',
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
        path: 'virgin',
        element: <Virgin />,
      },
      {
        path: '/cocktail-details/:id',
        element: <CocktailsDetails />,
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
      {
        path: 'devteam',
        element: <ShowTeam />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
