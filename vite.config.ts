import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://beer-seller-back-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['beer-seller-front-production.up.railway.app']
  },
})
