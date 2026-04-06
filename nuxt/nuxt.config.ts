export default defineNuxtConfig({
  css: [
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/styles/main.scss',
  ],
  plugins: [
    '~/plugins/auth-init.client.js'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`
        }
      }
    }
  }
})