<template>
  <div class="task-detail-page">
    <div class="header">
      <Button @click="router.back()">Назад</Button>
      <div class="actions">
        <Button @click="openEdit">Редактировать</Button>
        <Button @click="deleteTask" class="delete">Удалить</Button>
      </div>
    </div>

    <h1>{{ task.title }} <span class="priority">{{ task.priority }}</span></h1>

    <div class="info">
      <p><strong>Автор:</strong> {{ author }}</p>
      <p><strong>Описание:</strong> {{ task.description }}</p>
      <p><strong>Дата создания:</strong> {{ task.createdAt }}</p>
      <p><strong>Дедлайн:</strong> {{ task.dueDate }}</p>
      <p><strong>Выполнено:</strong> {{ task.isCompleted ? "Да" : "Нет" }}</p>
    </div>

    <ModalTaskForm
      v-model="showEditModal"
      :taskData="task"
      @saved="reloadTask"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import taskStore from "../../store/tasks";
import authStore from "../../store/auth";
import Button from "../../components/Button.vue";
import ModalTaskForm from "../../components/ModalTaskForm.vue";

const router = useRouter();
const route = useRoute();
const taskId = Number(route.params.id);

const task = computed(() => taskStore.getters.getTaskById(taskId));
const showEditModal = ref(false);

const author = computed(() => {
  return authStore.getters.getUserById(task.value?.userId)?.name || "Неизвестно";
});

const currentUser = computed(() => authStore.getters.getUser);

const canEdit = computed(() => {
  return (
    currentUser.value?.role === "admin" ||
    currentUser.value?.id === task.value?.userId
  );
});

onMounted(async () => {
  if (!taskStore.state.tasks.length) {
    await taskStore.dispatch("fetchTasks");
  }
});

const openEdit = () => showEditModal.value = true;

const reloadTask = async () => {
  await taskStore.dispatch("fetchTasks");
  showEditModal.value = false;
};

const deleteTask = async () => {
  if (confirm("Вы уверены, что хотите удалить задачу?")) {
    await taskStore.dispatch("deleteTask", taskId);
    router.push("/tasks");
  }
};
</script>

<style scoped lang="scss">
.task-detail-page {
  padding: 2em;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;

    .actions {
      display: flex;
      gap: 10px;

      .delete {
        background-color: #e53935;
        color: white;
      }
    }
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 1em;

    .priority {
      font-size: 1rem;
      color: #fff;
      background: #1976d2;
      padding: 0.2em 0.5em;
      border-radius: 6px;
      margin-left: 1em;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    p {
      margin: 0;
    }
  }
}
</style>