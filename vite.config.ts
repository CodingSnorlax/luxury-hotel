import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // 開發中 or 產品
  base: process.env.NODE_ENV === 'production' ? '/luxury-hotel/' : '/',
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, "node_modules/bootstrap")
    }
  },
})
