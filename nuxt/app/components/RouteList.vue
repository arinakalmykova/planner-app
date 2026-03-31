<template>
  <transition-group name="card" tag="div" class="routes-list" appear>
    <RouteCard
      v-for="route in routes"
      :key="route.id"
      :route="route"
      class="card"
    />
  </transition-group>
</template>

<script setup>
import RouteCard from './RouteCard.vue'
const props = defineProps({
  routes: Array,
});
</script>

<style scoped lang="scss">
.routes-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

:deep(.card-enter-active) {
  transition: all 0.4s ease;
}

:deep(.card-enter-from) {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

:deep(.card-enter-to) {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
