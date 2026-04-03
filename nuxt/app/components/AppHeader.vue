<template>
  <div class="header">
    <h1>Мой список задач</h1>
    <Button class="action">Добавить задачу</Button>
  </div>
</template>

<style scoped>
.header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 10vh;
  z-index: 100;
  border-bottom: 1px solid #ccc;

  .action {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>

<script setup>
import { Button } from './Button.vue'
</script>

