import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // 🔑 raiz do servidor
  build: {
    outDir: 'dist',
  },
})
