import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // важен для GitHub Pages: проект лежит в /Paletkin/, а не в корне домена
  base: '/Paletkin/',
  plugins: [react()],
})
