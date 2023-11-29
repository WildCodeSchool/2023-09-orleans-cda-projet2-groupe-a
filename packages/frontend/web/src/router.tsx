import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import ProfilPage from './pages/ProfilPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'my-profil',
    element: <ProfilPage />,
  },
]);

export default router;
