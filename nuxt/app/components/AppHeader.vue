<template>
  <div class="header">
    <h1>Мой список задач</h1>
    <Button @click="showDialog = true" class="action">Добавить задачу <i class="mdi mdi-plus-thick"></i></Button>
    <NewTaskDialog
      v-model="showDialog"
      @saved="refresh"
    />
  </div>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content:space-between;
  top: 0;
  height: 10vh;
  z-index: 100;
  margin:0 3em ;
  border-bottom: 1px solid $color-border;

  .action {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>

<script setup>
import Button from './Button.vue';
import NewTaskDialog from '../components/NewTaskDialog.vue';
import {ref} from "vue";

const showDialog = ref(false);

</script>

