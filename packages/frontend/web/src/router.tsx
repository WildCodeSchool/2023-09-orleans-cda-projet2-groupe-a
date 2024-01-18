import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from './components/AuthLayout';
import Registration from './components/auth/Registration';
import Diagnostic from './pages/Diagnostic';
import FinalDiagnostic from './pages/FinalDiagnostic';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
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
]);

export default router;
