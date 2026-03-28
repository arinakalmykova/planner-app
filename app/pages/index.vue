<template>
  <v-container>
    <h1> Главная страница </h1>
    <RouteCard  v-for="route in routes":route="route" />
    <v-btn color="primary" @click="goToAdd"> Добавить маршрут </v-btn>
  </v-container>
</template>

<script setup>
const goToAdd = () => {
  navigateTo("/add-route");
};

const routes = [
  { id: 1, title: "Маршрут 1", description: "Описание маршрута 1" },
  { id: 2, title: "Маршрут 2", description: "Описание маршрута 2" },
];
</script>
