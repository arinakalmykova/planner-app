import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        dark: {
          primary: '#ffffff',
          secondary: '#447e51',
          background: '#2e2e2e',
        },
        light: {
          primary: '#ffffff',
          secondary: '#447e51',
          background: '#ffffff',
        },
      },
    },
    
  })

  nuxtApp.provide('vuetify', vuetify);
  nuxtApp.vueApp.use(vuetify)
})