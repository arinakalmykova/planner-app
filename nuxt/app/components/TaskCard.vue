<template>
  <div @click="openCard" class="task-card">
    <div class="task-card-title">
      <input
        type="checkbox"
        class="checkbox"
        :checked="task.isCompleted"
        @click.stop="toggleComplete"
      />

      <div class="task-card-text">
        <h2>{{ task.title }}</h2>
      </div>
    </div>

    <div class="task-card-info">
      <div class="category">
        <p>{{ task.priority }}</p>
        <p>{{ author }}</p>
        <p>{{ task.dueDate }}</p>
      </div>
      <div class="task-card-actions">
        <Button @click.stop="editTask">Редактировать</Button>
        <Button @click.stop="deleteTask">Удалить</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import taskStore from "../store/tasks";
import Button from "../components/Button.vue";
import { useRouter } from "vue-router";
import authStore from "../store/auth";
import { computed } from "vue";

const router = useRouter();
const props = defineProps({
  task: Object,
});

const openCard = () => {
  router.push(`/task/${props.task.id}`);
};

const deleteTask = async () => {
  if (confirm("Вы уверены, что хотите удалить задачу?")) {
    await taskStore.dispatch("deleteTask", props.task.id);
  }
};

const editTask = () => {
  router.push(`/task/${props.task.id}`);
};

const author = computed(() => authStore.getters.getUserById(props.task.userId)?.name || "Неизвестно");

const toggleComplete = async () => {
  taskStore.commit("updateTask", {
    ...props.task,
    isCompleted: !props.task.isCompleted,
  });

  try {
    await taskStore.dispatch("updateTask", {
      ...props.task,
      isCompleted: !props.task.isCompleted,
    });
  } catch (err) {

    taskStore.commit("updateTask", props.task);
  }
};
</script>

<style scoped lang="scss">
.task-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $color-border;
  padding: 20px;
  gap: 20px;

  .task-card-title {
    display: flex;
    gap: 20px;
    align-items: flex-start;

    .checkbox {
      transform: scale(1.5);
      margin-top: 5px;
    }

    .task-card-text {
      display: flex;
      flex-direction: column;
      gap: 5px;

      h2 {
        margin: 0;
        font-size: 1.2rem;
      }

      p {
        margin: 0;
        font-size: 0.9rem;
        color: $color-text;
      }
    }
  }

  .task-card-info {
    display: flex;
    flex-direction: row;
    gap:70px;

    .category {
      display: flex;
      flex-direction: row;
      gap: 80px;
    }

    .task-card-actions {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>
