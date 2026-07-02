import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('[DIAGNOSTIC] process.env.VITE_API_URL at build time:', JSON.stringify(process.env.VITE_API_URL))

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  base: '/',
})