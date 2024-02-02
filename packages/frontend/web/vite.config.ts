import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  /* La ligne `const { FRONTEND_PORT } = loadEnv(mode, process.cwd(), '');` utilise la fonction
  `loadEnv` de la bibliothèque `vite` pour charger les variables d'environnement spécifiques au mode
  actuel (développement, production, etc.). */
  const { FRONTEND_PORT } = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: +FRONTEND_PORT,
    },
    build: {
      sourcemap: true,
    },
  };
});
