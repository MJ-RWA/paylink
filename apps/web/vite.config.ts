import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, '../../', '');

  return {
    plugins: [react(), tailwindcss()],

    // Explicitly define the build output for Vercel compatibility
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false, // Set to true if you need to debug production issues
    },

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        // Sets '@' to point to the apps/web directory
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        // Ignore the transaction store and dynamic JSONs to prevent unnecessary reloads
        ignored: [
          '**/.tx-store.json',
          '**/transactions.json',
          '**/registry.json'
        ],
      },
    },
  };
});