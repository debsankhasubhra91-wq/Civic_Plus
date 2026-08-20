import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
  ],
  build: {
    outDir: '../',
    emptyOutDir: false,
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html')
    }
  }
})
