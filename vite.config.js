import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/ShoppyGlobe/',
  server:{
    proxy:{
      '/api': 'http://localhost:8000',
    }
  },
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
});
