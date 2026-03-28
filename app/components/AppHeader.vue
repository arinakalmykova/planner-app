<template>
  <v-app-bar flat class="header">
    <v-container class="d-flex align-center">
      <Logo />
      <v-spacer/>
      <v-btn text to="/add-route">Добавить маршрут</v-btn>
      <v-btn @click="toggleTheme" text>Сменить тему</v-btn>
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

