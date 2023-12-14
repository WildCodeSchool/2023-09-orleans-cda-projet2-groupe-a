import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AgeProvider } from './contexts/AgeContext';
import { AuthProvider } from './contexts/AuthContext';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AgeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AgeProvider>
    </React.StrictMode>,
  );
}
