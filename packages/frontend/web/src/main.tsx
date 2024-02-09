import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AgeProvider } from './contexts/AgeContext.tsx';
import { AnimationsProvider } from './contexts/AnimationsContext.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { BirthProvider } from './contexts/BirthContext.tsx';
import './globals.css';
import router from './router.tsx';

const rootElement = document.querySelector('#root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AnimationsProvider>
        <BirthProvider>
          <AgeProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </AgeProvider>
        </BirthProvider>
      </AnimationsProvider>
    </React.StrictMode>,
  );
}
