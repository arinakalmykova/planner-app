<template>
  <div class="error-modal">
    <p>{{ message }}</p>
    <Button @click="$emit('retry')">Повторить</Button>
    <Button @click="$emit('close')">Закрыть</Button>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
defineProps({
  message: String,
});
</script>

<style scoped>
.error-modal {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $color-bg;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}
.error-modal button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>