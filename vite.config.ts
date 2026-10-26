import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// Vite hashes a chunk's own code, but lazy-import specifiers and preload
// dependency lists are written after that hash is computed. A chunk can keep its
// filename while pointing at a new lazy chunk, so a browser holding the previous
// deploy's cached importer would request a chunk that no longer exists. Salting
// every chunk hash per build keeps a deploy internally consistent.
const BUILD_SALT = Date.now().toString(36);

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'deploy-consistent-chunk-hash',
        augmentChunkHash() {
          return BUILD_SALT;
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-dom/client', 'scheduler'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
