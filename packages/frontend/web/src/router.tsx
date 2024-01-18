import { createBrowserRouter } from 'react-router-dom';

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
]);

export default router;
