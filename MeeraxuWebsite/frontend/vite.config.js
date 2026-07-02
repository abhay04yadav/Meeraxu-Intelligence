import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = process.env.VITE_API_URL || env.VITE_API_URL || 'http://localhost:5000/api'
  // Avoid printing the raw value (Vercel redacts it) - print derived facts instead
  console.log('[DIAGNOSTIC] VITE_API_URL length:', apiUrl.length)
  console.log('[DIAGNOSTIC] VITE_API_URL === localhost fallback exactly:', apiUrl === 'http://localhost:5000/api')
  console.log('[DIAGNOSTIC] VITE_API_URL includes "railway":', apiUrl.includes('railway'))
  console.log('[DIAGNOSTIC] VITE_API_URL includes "localhost":', apiUrl.includes('localhost'))
  console.log('[DIAGNOSTIC] VITE_API_URL first 4 chars:', apiUrl.slice(0, 4))
  console.log('[DIAGNOSTIC] VITE_API_URL last 4 chars:', apiUrl.slice(-4))

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