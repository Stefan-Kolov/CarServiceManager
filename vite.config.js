import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Vue plugin
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for `src` folder
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Forward API requests to Spring Boot
    },
  },
});
