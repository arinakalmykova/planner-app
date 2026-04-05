<template>
  <client-only>
    <div v-if="showDialog" class="modal-overlay">
      <div class="modal">
        <h1>Новая задача</h1>
        <form>
          <Input v-model="form.title" label="Заголовок" required />
          <Input v-model="form.description" label="Описание" required />
          <Input v-model="form.dueDate" label="Дедлайн" type="date" required />
        </form>
        <div class="actions">
          <Button @click="closeDialog">Отмена</Button>
          <Button @click="submitForm">Сохранить</Button>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup>
import Button from "../components/Button.vue";
import { ref, watch, defineProps, defineEmits } from "vue";
import taskStore from "../store/tasks";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "saved"]);

const showDialog = ref(props.modelValue);

const form = ref({
  title: "",
  description: "",
  dueDate: "",
});

watch(() => props.modelValue, val => (showDialog.value = val));
watch(showDialog, val => emit("update:modelValue", val));

const closeDialog = () => {
  showDialog.value = false;
};

const submitForm = async () => {
  if (!form.value.title || !form.value.description || !form.value.dueDate) {
    alert("Заполните все поля");
    return;
  }

  try {
    await taskStore.dispatch("createTask", { ...form.value });
    emit("saved");
    form.value.title = "";
    form.value.description = "";
    form.value.dueDate = "";
    closeDialog();
  } catch (err) {
    console.error(err);
    alert("Ошибка при создании задачи");
  }
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  padding: 2em;
  border-radius: 10px;
  width: 400px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1em;
}
</style>