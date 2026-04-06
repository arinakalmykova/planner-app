<template>
  <AppHeader />
  <main>
    <slot />
  </main>
</template>

<script setup>
import AppHeader from "~/components/AppHeader.vue";
</script>

<style scoped>
main {
  position: relative; 
  z-index: 1;      
}
</style>