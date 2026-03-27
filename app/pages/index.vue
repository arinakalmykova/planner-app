<template>
  <v-container>
    <v-btn color="primary" @click="goToAdd"> Добавить маршрут </v-btn>
  </v-container>
</template>

<script setup>
const goToAdd = () => {
  navigateTo("/add-route");
};
</script>
