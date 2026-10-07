import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-root-favicon',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/favicon.ico' || req.url?.startsWith('/favicon.ico?')) {
            req.url = '/framewisesite/favicon.ico';
          }
          next();
        });
      }
    }
  ],
  base: '/framewisesite/',
  server: {
    port: 5180
  }
});
