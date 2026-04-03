<template>
  <div @click="openCard" class="task-card">
    <div class="task-card-header">
      <h1>{{ task.title }}</h1>
      <span>{{ task.description }}</span>
      <span>{{ task.dueDate }}</span>
      <span>{{ task.date }}</span>
    </div>
    <div class="task-card-actions">
      <input
        type="checkbox"
        :checked="task.isCompleted"
        @click.stop="toggleComplete"
      />
      <Button @click="deleteTask">mdi-trash-can</Button>
    </div>
  </div>
</template>

<script setup>
import taskStore from "../store/tasks";
import { Button } from "../components/Button.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const props = defineProps({
  task: Object,
});

const openCard = () => {
  router.push(`/task/${props.task.id}`);
};

const deleteTask = async (e) => {
  e.stopPropagation();
  await taskStore.dispatch("deleteTask", props.task.id);
};

const toggleComplete = async () => {
  await store.dispatch("updateTask", {
    ...props.task,
    isCompleted: !props.task.isCompleted,
  });
};
</script>

<style scoped lang="scss">
.task-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 30px;
  gap: 10px;

  .task-card-header {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
