<template>
  <v-container class="main">
    <h1 class="text-main"> Мои путешествия </h1>
    <SearchBar v-model="searchQuery" />
    <div class="routes-block">
      <template v-if="routes.length > 0">
        <RouteList :routes="routes"/>
      </template>
      <template v-else>
        <p>У вас пока нет маршрутов</p>
      </template>
      <v-icon @click="showDialog = true">mdi-plus-thick</v-icon>
    </div>
    <NewRouteDialog
      v-model="showDialog"
      @saved="refresh"
    />
  </v-container>
</template>

<script setup>
import {ref,computed,onMounted} from "vue";
import store from '../store/store';

const showDialog = ref(false);
const searchQuery = ref('');

onMounted(async() => {
  if(!store.state.routes.length){
    await store.dispatch('fetchRoutes');
  }
});

const routes = computed(() => store.state.routes);
const refresh = async () => {
  await store.dispatch('fetchRoutes');
};
</script>

<style scoped lang="scss">
.main {
    padding-top: 3em;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .routes-block {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
}
</style>