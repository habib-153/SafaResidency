/* eslint-disable no-unused-vars */
// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@material-tailwind/react', 'antd', 'framer-motion'],
            'redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
            'utils': ['dayjs', 'axios', 'i18next', 'react-i18next'],
            'forms': ['react-hook-form', 'react-quill'],
            'viz': ['recharts', '@lottiefiles/react-lottie-player']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: mode !== 'production',
      minify: 'esbuild',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production'
        }
      },
      target: 'esnext',
      cssCodeSplit: true,
      assetsInlineLimit: 4096
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@material-tailwind/react']
    }
  }
})