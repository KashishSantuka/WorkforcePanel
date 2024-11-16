import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths are used for assets
  build: {
    outDir: 'dist', // Specifies output directory
    emptyOutDir: true, // Clears the output directory before building
  },
  server: {
    port: 3000, // Development server port
  },
});
