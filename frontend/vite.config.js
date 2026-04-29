import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/02_module_b': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000'
    }
  }
})
