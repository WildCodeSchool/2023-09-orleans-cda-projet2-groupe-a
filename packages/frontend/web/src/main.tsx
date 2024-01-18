import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import AuthContext from './contexts/AuthContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </React.StrictMode>,
  );
}
