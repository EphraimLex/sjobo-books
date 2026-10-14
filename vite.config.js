import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],

  // Match the repository path used by GitHub Pages.
  base: '/sjobo-books/',
});
