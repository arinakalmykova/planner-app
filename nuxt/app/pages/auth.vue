<template>
  <div class="main">
    <div class="login">
      <div>
        <h1 class="title-login">To-Do List</h1>
        <p class="description-login">Управляйте задачами эффективно</p>
      </div>

      <!-- Форма входа -->
      <AuthForm
        v-if="loginSelected"
        type="login"
        :form="formLogin"
        :errors="errorsLogin"
        @update:form="formLogin = $event"
        @submit="submitLogin"
        @toggle="loginSelected = false"
      />

      <!-- Форма регистрации -->
      <AuthForm
        v-else
        type="register"
        :form="formRegister"
        :errors="errorsRegister"
        @update:form="formRegister = $event"
        @submit="submitRegister"
        @toggle="loginSelected = true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import authStore from "../store/auth";
import AuthForm from "../components/AuthForm.vue";

const router = useRouter();
const loginSelected = ref(true);

// Формы
const formLogin = ref({ email: "", password: "" });
const formRegister = ref({ name: "", email: "", password: "" });

// Ошибки
const errorsLogin = ref({});
const errorsRegister = ref({});

// Валидация email
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Валидация форм
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

  if (!formRegister.value.password) errorsRegister.value.password = "Введите пароль";
  else if (formRegister.value.password.length < 6)
    errorsRegister.value.password = "Пароль минимум 6 символов";

  return Object.keys(errorsRegister.value).length === 0;
};

// Сабмит логина
const submitLogin = async (form) => {
  formLogin.value = form;
  if (!validateLogin()) return;
  try {
    await authStore.dispatch("login", formLogin.value);
    router.push("/");
  } catch (err) {
    errorsLogin.value.general = err.message || "Ошибка при входе";
  }
};

// Сабмит регистрации
const submitRegister = async (form) => {
  formRegister.value = form;
  if (!validateRegister()) return;
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