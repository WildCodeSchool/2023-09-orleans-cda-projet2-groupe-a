import { createBrowserRouter } from 'react-router-dom';

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
]);

export default router;
