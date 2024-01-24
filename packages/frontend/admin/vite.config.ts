import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { BACKEND_HOST, BACKEND_PORT } = loadEnv(mode, process.cwd(), '');
  console.log(BACKEND_HOST, BACKEND_PORT);

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `http://${BACKEND_HOST}:${BACKEND_PORT}`, // L'URL de votre serveur backend
          changeOrigin: true, // cela est nécessaire pour les hôtes virtuels
          secure: false, // si le backend est en HTTPS, mettre cette option à true
        },
      },
    },
  };
});
