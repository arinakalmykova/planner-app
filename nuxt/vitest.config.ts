import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./app/tests/setup.js'],
    css: false,
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    }
  },
  optimizeDeps: {
    entries: [],
    exclude: ['vuetify']
  }
});