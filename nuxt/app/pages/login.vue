<template>
  <div class="main">
    <div class="login">
      <div>
        <h1 class="title-login">To-Do List</h1>
        <p class="description-login">Управляйте задачами эффективно</p>
      </div>

      <!-- Форма Входа -->
      <form v-if="loginSelected" @submit.prevent="submitLogin" class="form">
        <h1>Вход</h1>

        <Input v-model="formLogin.email" label="Email" />
        <span v-if="errorsLogin.email" class="error">{{
          errorsLogin.email
        }}</span>

        <Input v-model="formLogin.password" type="password" label="Пароль" />
        <span v-if="errorsLogin.password" class="error">{{
          errorsLogin.password
        }}</span>

        <Button type="submit">Войти</Button>

        <p>
          Нет аккаунта?
          <span @click="loginSelected = false" class="link"
            >Зарегистрироваться</span
          >
        </p>
      </form>

      <!-- Форма Регистрации -->
      <!-- Форма Регистрации -->
      <form v-else @submit.prevent="submitRegister" class="form">
        <h1>Регистрация</h1>

        <!-- Имя -->
        <Input v-model="formRegister.name" label="Имя" />
        <span v-if="errorsRegister.name" class="error">{{
          errorsRegister.name
        }}</span>

        <!-- Email -->
        <Input v-model="formRegister.email" label="Email" />
        <span v-if="errorsRegister.email" class="error">{{
          errorsRegister.email
        }}</span>

        <!-- Пароль -->
        <Input v-model="formRegister.password" type="password" label="Пароль" />
        <span v-if="errorsRegister.password" class="error">{{
          errorsRegister.password
        }}</span>

        <Button type="submit">Зарегистрироваться</Button>

        <p>
          Уже есть аккаунт?
          <span @click="loginSelected = true" class="link">Войти</span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import { ref } from "vue";
import authStore from "../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const loginSelected = ref(true);

definePageMeta({
  middleware: "auth",
  layout: "auth",
});

const formLogin = ref({
  email: "",
  password: "",
});
const formRegister = ref({
  name: "",
  email: "",
  password: "",
});

const errorsLogin = ref({});
const errorsRegister = ref({});

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateLogin = () => {
  errorsLogin.value = {};
  if (!formLogin.value.email) errorsLogin.value.email = "Введите email";
  else if (!validateEmail(formLogin.value.email))
    errorsLogin.value.email = "Некорректный email";

  if (!formLogin.value.password) errorsLogin.value.password = "Введите пароль";
  else if (formLogin.value.password.length < 6)
    errorsLogin.value.password = "Пароль минимум 6 символов";

  return Object.keys(errorsLogin.value).length === 0;
};

const validateRegister = () => {
  errorsRegister.value = {};

  if (!formRegister.value.name) errorsRegister.value.name = "Введите имя";

  if (!formRegister.value.email) errorsRegister.value.email = "Введите email";
  else if (!validateEmail(formRegister.value.email))
    errorsRegister.value.email = "Некорректный email";

  if (!formRegister.value.password)
    errorsRegister.value.password = "Введите пароль";
  else if (formRegister.value.password.length < 6)
    errorsRegister.value.password = "Пароль минимум 6 символов";

  return Object.keys(errorsRegister.value).length === 0;
};

const submitLogin = async () => {
  if (!validateLogin()) return;
  try {
    await authStore.dispatch("login", formLogin.value);
    router.push("/");
  } catch (err) {
    errorsLogin.value.general = err.message || "Ошибка при входе";
  }
};

const submitRegister = async () => {
  try {
    await authStore.dispatch("register", formRegister.value);
    alert("Регистрация прошла успешно");

    loginSelected.value = true;
  } catch (err) {
    errorsRegister.value.general = err.message || "Ошибка при регистрации";
  }
};
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50vh;
    width: 600px;
    gap: 20px;
    margin: auto;

    .form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .link {
      color: $color-primary;
      cursor: pointer;
    }

    .error {
      color: red;
      font-size: 0.85rem;
      text-align: left;
      margin-top: -5px;
      margin-bottom: 5px;
    }
  }
}
</style>
