import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Widget-specific build config
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget/index.tsx'),
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