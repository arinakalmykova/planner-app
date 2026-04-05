<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', variant]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: "button" },
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: "primary" }
})
</script>

<style scoped lang="scss">
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;

  &.primary {
    background: $color-button;
    color: white;

    &:hover {
    background: $color-button-hover;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

</style>