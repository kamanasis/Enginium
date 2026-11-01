import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { reticle } from '@reticlehq/vite-plugin';
// https://vite.dev/config/
export default defineConfig({
  plugins: [reticle(), react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons-vendor';
          }
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
