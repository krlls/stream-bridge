import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['apple-touch-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },
      manifest: {
        name: 'Stream-Bridge',
        short_name: 'S-Bridge',
        description: 'Music synchronization tool that allows users to sync music from various streaming services.',
        theme_color: '#313542',
        icons: [
          {
            src: 'assets/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    react(),
    checker({
      typescript: true,
    }),
  ],
})
