<template>
  <div v-if="task" class="task-detail">

    <Button class="back-btn" @click="router.back()"><i class=" mdi mdi-arrow-left"></i></Button>

    <div class="task-header">
      <h2>{{ task.title }}</h2>
      <div class="actions">
        <Button class="edit-btn" @click="editing = true">Редактировать</Button>
        <Button class="delete-btn" @click="deleteTask">Удалить</Button>
      </div>
    </div>

    <div v-if="editing" class="edit-form">
      <Input v-model="taskCopy.title" label="Заголовок" />
      <Input v-model="taskCopy.description" label="Описание" />
      <Input v-model="taskCopy.dueDate" label="Дедлайн" type="date" />
      <Button @click="saveTask">Сохранить</Button>
      <Button @click="cancelEdit">Отмена</Button>
    </div>

    <div v-else class="task-info">
      <p><strong>Описание:</strong> {{ task.description }}</p>
      <p><strong>Дедлайн:</strong> {{ task.dueDate }}</p>
      <p><strong>Дата создания:</strong> {{ task.createdAt }}</p>
      <p><strong>Автор:</strong> {{ task.authorName }}</p>
      <p><strong>Выполнено:</strong> {{ task.isCompleted ? "Да" : "Нет" }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import taskStore from "../../store/tasks";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";

const router = useRouter();
const route = useRoute();

const taskId = Number(route.params.id);

const editing = ref(false);
const task = computed(() => taskStore.getters.getTaskById(taskId));

const taskCopy = ref(task.value ? { ...task.value } : null);


onMounted(async () => {
  await taskStore.dispatch("fetchTasks");
});

const deleteTask = async () => {
  if (confirm("Вы уверены, что хотите удалить задачу?")) {
    await taskStore.dispatch("deleteTask", taskId);
    router.push("/tasks"); 
  }
};

const saveTask = async () => {
  await taskStore.dispatch("updateTask", taskCopy.value);
  editing.value = false;
};

const cancelEdit = () => {
  taskCopy.value = { ...task.value };
  editing.value = false;
};
</script>

<style scoped lang="scss">
.v-container {

  .arrow{
    margin-bottom:30px;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    padding-bottom: 5px;
  }

  img {
    display: block;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .route-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;

    h3 {
      font-size: 1.5rem;
      margin: 0;
    }

    p {
      font-size: 1rem;
      line-height: 1.4;
    }

    .v-icon {
      cursor: pointer;
      color: #1976d2;
      &:hover {
        color: #0d47a1;
      }
    }

    .v-btn {
      margin-right: 10px;
      font-size: 0.9rem;
    }
  }

  .point {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
      font-size: 1.3rem;
      margin: 0;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .v-btn {
      align-self: flex-start;
      font-size: 0.85rem;
      &.red {
        background-color: #e53935;
        color: #fff;
        &:hover {
          background-color: #b71c1c;
        }
      }
      &.primary {
        background-color: #1976d2;
        color: #fff;
        &:hover {
          background-color: #0d47a1;
        }
      }
    }

    .v-icon {
      cursor: pointer;
      color: #1976d2;
      &:hover {
        color: #0d47a1;
      }
    }

    img {
      max-width: 100%;
      border-radius: 6px;
    }
}
}
</style>
