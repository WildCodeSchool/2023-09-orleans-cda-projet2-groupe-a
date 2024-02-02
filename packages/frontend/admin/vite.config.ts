import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const { BACKEND_HOST, BACKEND_PORT } = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `http://${BACKEND_HOST}:${BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
