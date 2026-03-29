<template>
  <client-only>
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title>Новый маршрут</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="form.title"
              label="Название маршрута"
              required
            />
            <v-text-field
              v-model="form.description"
              label="Описание"

              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeDialog">Отмена</v-btn>
          <v-btn @click="submitForm">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </client-only>
</template>

<script setup>
import { ref, defineProps, defineEmits,watch } from "vue";
import store from '../store/store';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(["update:modelValue", "saved"]);

const showDialog = ref(props.modelValue);
const form = ref({ title: "", description: "" });

watch(
  () => props.modelValue,
  (val) => (showDialog.value = val)
);
watch(showDialog, (val) => emit("update:modelValue", val));

const closeDialog = () => {
  showDialog.value = false;
};

const submitForm = async () => {
  if (!form.value.title || !form.value.description) {
    alert("Заполните все поля");
    return;
  }

  try {
    await store.dispatch('createRoute',form.value);
    emit("saved"); 
    form.value.title = "";
    form.value.description = "";
    closeDialog();
  } catch (err) {
    console.error(err);
    alert("Ошибка при сохранении маршрута");
  }
};
</script>