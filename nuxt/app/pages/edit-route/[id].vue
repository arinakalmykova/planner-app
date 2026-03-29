<template>
  <v-container>
    <h1>{{ route.title }}</h1>
    <p>{{ route.description }}</p>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = ref({}); // сюда будем загружать данные

const vueRoute = useRoute();
const routeId = vueRoute.params.id;

onMounted(async () => {
  // Берём данные с сервера
  route.value = await $fetch(`http://localhost:3001/routes/${routeId}`);
});
</script>