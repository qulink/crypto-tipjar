import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        site: resolve(__dirname, 'index.html'),
        widget: resolve(__dirname, 'src/widget/index.tsx')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'widget' ? 'embed.js' : 'assets/[name]-[hash].js'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'embed.css'
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})