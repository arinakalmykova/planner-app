import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default {
  plugins: [
    vue(),
    vuetify({ autoImport: true }) // чтобы Vuetify компоненты и стили правильно импортировались
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './app') }
  }
}