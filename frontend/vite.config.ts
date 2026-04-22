import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["pwdigital.up.railway.app", "localhost", "127.0.0.1"],
  },
  preview: {
    allowedHosts: ["pwdigital.up.railway.app", "localhost", "127.0.0.1"],
  },
});
