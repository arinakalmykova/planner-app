<template>
  <div class="login">
    <h1 class="title-login">To-Do List</h1>
    <p class="description-login">Управляйте задачами эффективно</p>
    <form v-if="loginSelected" @submit.prevent="submitLogin">
      <h1>Вход</h1>

      <Input v-model="formLogin.email" label="Email" />
      <Input v-model="formLogin.password" type="password" label="Пароль" />

      <Button type="submit">Войти</Button>
      <p>
        Нет аккаунта?
        <span @click="loginSelected = false">Зарегистрироваться</span>
      </p>
    </form>
    <form v-else @submit.prevent="submitRegister">
      <h1>Регистрация</h1>

      <Input v-model="formRegister.email" label="Email" />
      <Input v-model="formRegister.password" type="password" label="Пароль" />

      <Button type="submit">Зарегистрироваться</Button>

      <p>
        Уже есть аккаунт?
        <span @click="loginSelected = true">Войти</span>
      </p>
    </form>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { ref } from "vue";
import authStore from "../store/auth";


const loginSelected = ref(true);

const formLogin = ref({
  email: "",
  password: "",
});

const formRegister = ref({
  email: "",
  password: "",
});

const submitLogin = async () => {
  if (!formLogin.value.email || !formLogin.value.password) {
    console.log("Заполните поля");
    return;
  }

  await authStore.dispatch("login", formLogin.value);
};

const submitRegister = async () => {
  if (!formRegister.value.email || !formRegister.value.password) {
    console.log("Заполните поля");
    return;
  }

  await authStore.dispatch("register", formRegister.value);
};
</script>

<style scoped lang="scss"></style>
