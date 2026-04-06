<template>
  <div class="error-backdrop">
    <div class="error-modal">
      <p>{{ message }}</p>
      <Button @click="$emit('retry')">Повторить</Button>
      <Button @click="$emit('close')">Закрыть</Button>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
defineProps({
  message: String,
});
</script>

<style scoped lang="scss">
.error-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-modal {
    background: $color-bg;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
