import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

// Widget-specific build config
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {}
  },
  build: {
    lib: {
      entry: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/widget/index.tsx'),
      name: 'TipWidget',
      formats: ['iife'],
      fileName: 'embed'
    },
    rollupOptions: {
      output: {
        assetFileNames: 'embed.[ext]'
      }
    },
    outDir: 'dist/widget'
  }
})