import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import Mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Mkcert(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Hide-n-Seek',
        short_name: 'Hide-n-Seek',
        description: 'AR Game Template',
        theme_color: '#ffffff',
      }
    })
  ],

  base: "/ar-game-template/",

  server: {
    host: true,
    port: 3000,
    open: true,
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'Game/index.html'),
      },
    },
  },
})
