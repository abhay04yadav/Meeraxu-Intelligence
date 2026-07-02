import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = process.env.VITE_API_URL || env.VITE_API_URL || 'http://localhost:5000/api'
  console.log('[DIAGNOSTIC] resolved VITE_API_URL for define():', JSON.stringify(apiUrl))

  return {
    plugins: [react()],
    server: {
      open: true,
    },
    base: '/',
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
  }
})