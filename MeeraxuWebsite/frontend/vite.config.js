import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

console.log('[DIAGNOSTIC] process.env.VITE_API_URL at build time:', JSON.stringify(process.env.VITE_API_URL))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('[DIAGNOSTIC] vite mode:', mode)
  console.log('[DIAGNOSTIC] loadEnv().VITE_API_URL:', JSON.stringify(env.VITE_API_URL))

  return {
    plugins: [react()],
    server: {
      open: true,
    },
    base: '/',
  }
})