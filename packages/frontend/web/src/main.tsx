import React from 'react';
import ReactDOM from 'react-dom/client';
import Favicon from 'react-favicon';
import { RouterProvider } from 'react-router-dom';

import { AnimationsProvider } from './contexts/AnimationsContext.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { BirthProvider } from './contexts/BirthContext.tsx';
import './globals.css';
import router from './router.tsx';

const Main = () => {
  return <Favicon src='/yummycorn-favicon.png' alt='favicon Yummycorn' />;
};

export default Main;

const rootElement = document.querySelector('#root');

// Taken into account that CheckBirthdate can come before authentication,
// AgeProvider will be placed around AuthProvider.
// If Authentication came before, AgeProvider should be placed inside of AuthProvider.
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AnimationsProvider>
        <BirthProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </BirthProvider>
      </AnimationsProvider>
    </React.StrictMode>,
  );
}
