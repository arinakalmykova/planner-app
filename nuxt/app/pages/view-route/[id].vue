<template>
  <v-container>
    <h1>{{ route.title }}</h1>
    <p>{{ route.description }}</p>
  </v-container>
</template>

<script setup>
    import { useRoute } from 'vue-router'
    import { computed, onMounted } from 'vue'
    import store from '../../store/store';

    const vueRoute = useRoute()
    const routeId = Number(vueRoute.params.id)

    onMounted(async () => {
        if (!store.state.routes.length) {
            await store.dispatch('fetchRoutes')
        }
    })

    const route = computed(() => store.getters.getRouteById(routeId))
</script>
