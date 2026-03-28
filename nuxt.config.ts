import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css', '@/assets/styles/main.scss'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [vuetify()],
  },
})