import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Registration from './components/auth/Registration';
import Card from './pages/Card';
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
  {
    path: '/card',
    element: <Card />,
  },
]);

export default router;
