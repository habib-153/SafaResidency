/* eslint-disable no-unused-vars */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production' || mode === 'development' 
  // console.log(`Running in ${mode} mode`)
  return {
    plugins: [
      react(),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      visualizer({ // Analyze bundle size
        filename: 'stats.html',
        open: false,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-core': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@material-tailwind/react', 'antd'],
            'state': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
            'animation': ['framer-motion'],
            'forms': ['react-hook-form', 'react-quill'],
            'utils': ['dayjs', 'axios', 'lodash'],
            'i18n': ['i18next', 'react-i18next'],
            'charts': ['recharts'],
            'firebase': ['@firebase/auth', 'firebase/app'],
            'icons': {
              'icons-tb': ['react-icons/tb'],
              'icons-fa': ['react-icons/fa'],
              'icons-bs': ['react-icons/bs'],
              'icons-hi': ['react-icons/hi']
            }
          }
        }
      },
      minify: 'esbuild',
      target: 'esnext',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      assetsInlineLimit: 4096,
      reportCompressedSize: true,
      sourcemap: !isProduction,
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        '@material-tailwind/react',
        '@firebase/auth',
        'firebase/app'
      ],
    },
    esbuild: {
      jsxInject: `import React from 'react'`,
      drop: isProduction ? ['console', 'debugger'] : [],
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
      legalComments: 'none'
    }
  }
})