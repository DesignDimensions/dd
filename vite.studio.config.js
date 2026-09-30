import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * The studio (the CMS editor) and its preview page: built from cms/app into
 * build/studio-app with relative paths, so the folder works wherever it is
 * uploaded on cPanel. scripts/build-studio.mjs assembles the final folder.
 */
export default defineConfig({
  root: fileURLToPath(new URL('./cms/app', import.meta.url)),
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./build/studio-app', import.meta.url)),
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./cms/app/index.html', import.meta.url)),
        preview: fileURLToPath(new URL('./cms/app/preview.html', import.meta.url)),
      },
    },
  },
  server: { open: false },
})
