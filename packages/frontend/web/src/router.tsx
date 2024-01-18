import { createBrowserRouter } from 'react-router-dom';

import Card from './pages/Card';
import Diagnostic from './pages/Diagnostic';
import FinalDiagnostic from './pages/FinalDiagnostic';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/diagnostic',
    element: <Diagnostic />,
  },
  {
    path: '/final-diagnostic',
    element: <FinalDiagnostic />,
  },
  {
    path: '/card',
    element: <Card />,
  },
]);

export default router;
