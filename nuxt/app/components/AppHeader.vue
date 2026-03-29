<template>
  <v-app-bar flat class="header">
    <v-container class="d-flex align-center">
      <Logo />
      <v-spacer/>
      <div class = "action">
        <v-icon @click="toggleTheme" icon="mdi-moon-waxing-crescent"></v-icon>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 10vh;
  z-index: 100;
  border-bottom: 1px solid #ccc;

  .action {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>

<script setup>
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const vuetify = nuxtApp.$vuetify

const toggleTheme = () => {
  vuetify.theme.global.name.value = vuetify.theme.global.name.value === 'dark' ? 'light' : 'dark';
}
</script>

