import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AgeProvider } from './contexts/AgeProviderContext';
import { AuthProvider } from './contexts/AuthContext';
import './globals.css';
import CheckBirthdate from './pages/CheckBirthdate';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

// Taken into account that CheckBirthdate can come before authentication,
// AgeProvider will be placed around AuthProvider.
// If Authentication came before, AgeProvider should be placed inside of AuthProvider.
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AgeProvider>
        <CheckBirthdate />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AgeProvider>
    </React.StrictMode>,
  );
}
