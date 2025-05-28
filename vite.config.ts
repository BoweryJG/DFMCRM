import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    headers: {
      'Content-Type': 'application/javascript',
    },
  },
  build: {
    target: 'es2015',
    modulePreload: {
      polyfill: true,
    },
    assetsInclude: ['**/*.js'],
  },
  base: './',
});
