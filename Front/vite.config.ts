import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Открывает браузер автоматически
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5278',
        changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    }
  },
  preview: {
    port: 3000,
    open: true,
  }
});