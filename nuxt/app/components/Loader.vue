<template>
  <div v-if="visible" class="loader-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color-bg;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid $color-border;
    border-top: 5px solid $color-primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
