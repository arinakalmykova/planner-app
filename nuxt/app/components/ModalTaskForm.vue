<template>
  <client-only>
    <div v-if="showDialog" class="modal-overlay">
      <div class="modal">
        <h2>{{ isEdit ? "Редактировать задачу" : "Новая задача" }}</h2>
        <form @submit.prevent="submitForm" class="form">
          <Input v-model="form.title" label="Заголовок" required />
          <Input v-model="form.description" label="Описание" required />
          <Input v-model="form.dueDate" label="Дедлайн" type="date" required />
          <select v-model="form.priority" required>
            <option value="" disabled>Выберите приоритет</option>
            <option value="низкий">Низкий</option>
            <option value="средний">Средний</option>
            <option value="высокий">Высокий</option>
          </select>
        </form>

        <div class="actions">
          <Button @click="closeDialog">Отмена</Button>
          <Button @click="submitForm">{{
            isEdit ? "Сохранить" : "Создать"
          }}</Button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { ref, watch } from "vue";
import taskStore from "../store/tasks";

const props = defineProps({
  modelValue: Boolean,
  taskData: Object,
});

const emit = defineEmits(["update:modelValue", "saved"]);

const showDialog = ref(props.modelValue);
const isEdit = ref(!!props.taskData);

const form = ref({
  title: props.taskData?.title || "",
  description: props.taskData?.description || "",
  dueDate: props.taskData?.dueDate || "",
  priority: props.taskData?.priority || "",
});

watch(
  () => props.modelValue,
  (val) => (showDialog.value = val),
);
watch(showDialog, (val) => emit("update:modelValue", val));

const closeDialog = () => {
  showDialog.value = false;
};

const submitForm = async () => {
  if (
    !form.value.title ||
    !form.value.description ||
    !form.value.dueDate ||
    !form.value.priority
  ) {
    alert("Заполните все поля");
    return;
  }

  try {
    if (isEdit.value) {
      await taskStore.dispatch("updateTask", {
        ...props.taskData,
        ...form.value,
      });
      await taskStore.dispatch("fetchTasks");
    } else {
      await taskStore.dispatch("createTask", { ...form.value });
      await taskStore.dispatch("fetchTasks");
      form.value = {
        title: "",
        description: "",
        dueDate: "",
        priority: "",
      };
    }

    emit("saved");
    closeDialog();
  } catch (err) {
    console.error(err);
    alert("Ошибка при сохранении задачи");
  }
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;

  .modal {
    background: $color-modal;
    padding: 2em;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;

    select {
      padding: 0.5em;
      border-radius: 6px;
      border: 1px solid $color-border;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 1em;
  }
}
</style>
