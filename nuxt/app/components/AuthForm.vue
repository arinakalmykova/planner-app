<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h1>{{ type === "login" ? "Вход" : "Регистрация" }}</h1>

    <template v-if="type === 'register'">
      <Input v-model="localForm.name" label="Имя" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </template>

    <Input v-model="localForm.email" label="Email" />
    <span v-if="errors.email" class="error">{{ errors.email }}</span>

    <Input v-model="localForm.password" type="password" label="Пароль" />
    <span v-if="errors.password" class="error">{{ errors.password }}</span>

    <Button type="submit">
      {{ type === "login" ? "Войти" : "Зарегистрироваться" }}
    </Button>

    <p>
      {{ type === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?" }}
      <span @click="$emit('toggle')" class="link">
        {{ type === "login" ? "Зарегистрироваться" : "Войти" }}
      </span>
    </p>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import Input from "./Input.vue";
import Button from "./Button.vue";

const props = defineProps({
  type: { type: String, required: true }, // 'login' | 'register'
  form: { type: Object, required: true },
  errors: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["submit", "toggle", "update:form"]);

const localForm = ref({ ...props.form });

watch(
  localForm,
  (val) => {
    emit("update:form", val);
  },
  { deep: true },
);

watch(
  () => props.form,
  (val) => {
    localForm.value = { ...val };
  },
);

const handleSubmit = () => {
  emit("submit", localForm.value);
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .link {
    color: $color-primary;
    cursor: pointer;
  }

  .error {
    color: $color-red;
    font-size: 0.85rem;
    text-align: left;
    margin-top: -5px;
    margin-bottom: 5px;
  }
}
</style>
