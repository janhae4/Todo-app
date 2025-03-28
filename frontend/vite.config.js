import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { config } from 'dotenv';

// https://vite.dev/config/
config()
console.log(process.env.REACT_APP_BACKEND, process.env.REACT_APP_PORT)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: `http://${process.env.REACT_APP_BACKEND}:${process.env.REACT_APP_PORT}`,
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: `http://${process.env.REACT_APP_BACKEND}:${process.env.REACT_APP_PORT}`,
        changeOrigin: true,
        secure: false,
      },

      "/api/guest": {
        target: `http://${process.env.REACT_APP_BACKEND}:${process.env.REACT_APP_PORT}`,
        changeOrigin: true,
        secure: false,
      },
    }
  },
})
