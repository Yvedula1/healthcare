import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend dev server runs on 5173 (allowed by the backend CORS config).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
