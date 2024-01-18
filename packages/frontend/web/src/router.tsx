import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Registration from './components/auth/Registration';
import FinalDiagnostic from './pages/FinalDiagnostic';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import Profil from './pages/Profil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/diagnostic',
            element: <Inscription />,
          },
        ],
      },
      {
        path: '/registration',
        element: <Registration />,
      },
    ],
  },
  {
    path: '/final-diagnostic',
    element: <FinalDiagnostic />,
  },
  {
    path: '/profil',
    element: <Profil />,
  },
]);

export default router;
