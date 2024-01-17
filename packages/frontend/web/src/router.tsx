import { createBrowserRouter } from 'react-router-dom';

import Diagnostic from './pages/Diagnostic';
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
]);

export default router;
