<template>
  <client-only>
    <div v-model="showDialog">
      <div>
        <h1>Новая задача</h1>
        <div>
          <form>
            <Input
              v-model="form.title"
              label="Заголовок"
              required
            />
            <Input
              v-model="form.description"
              label="Описание"
              required
            />
            <Input
              v-model="form.dueDate"
              label="Дедлайн"
              type="date"
              required
            />
          </form>
        </div>
        <div>
          <v-spacer />
          <Button @click="closeDialog">Отмена</Button>
          <Button @click="submitForm">Сохранить</Button>
        </div>
      </v-card>
    </v-dialog>
  </client-only>
</template>

<script setup >
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

watch(
  () => props.modelValue,
  (val) => (showDialog.value = val)
);

watch(showDialog, (val) => emit("update:modelValue", val));

const closeDialog = () => {
  showDialog.value = false;
};

const submitForm = async () => {
  if (!form.value.title || !form.value.description || !form.value.dueDate) {
    alert("Заполните все поля");
    return;
  }

  try {
    // создаём новую задачу через store
    await taskStore.dispatch("createTask", { ...form.value });
    emit("saved"); // уведомляем родителя, что задача сохранена
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