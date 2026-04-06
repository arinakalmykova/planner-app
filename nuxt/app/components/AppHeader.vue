<template>
  <header>
    <h1>Мой список задач</h1>
    <div class="actions">
      <div class="user-info" v-if="isAuth">
        <span class="role">{{ user.role.toUpperCase() }}</span>
      </div>
      <Button @click="showDialog = true" class="action"
        >Добавить задачу <i class="mdi mdi-plus-thick"></i
      ></Button>
      <Button @click="logout" class="logout">Выйти</Button>
    </div>
  </header>
  <ModalTaskForm v-model="showDialog" />
</template>

<style scoped lang="scss">
header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  height: 10vh;
  margin: 0 3em;
  border-bottom: 1px solid $color-border;

  .actions {
    display: flex;
    flex-direction: row;
    gap:20px; 
    justify-content:center;
    align-items:center;

    .action {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>

<script setup>
import Button from "./Button.vue";
import ModalTaskForm from "../components/ModalTaskForm.vue";
import { ref } from "vue";
import authStore from "../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const showDialog = ref(false);
const user = computed(() => authStore.state.user);
const isAuth = computed(() => authStore.getters.isAuth);

const logout = () => {
  authStore.commit("logout");
  router.push("/login");
};
</script>
