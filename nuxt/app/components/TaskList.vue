<template>
  <transition-group name="card" tag="div" class="tasks-list" appear>
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      class="card"
    />
  </transition-group>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
const props = defineProps({
  tasks: Array,
});
</script>

<style scoped lang="scss">
.tasks-list {
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
