<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', variant]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button' // button | submit | reset
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'primary' // primary | secondary и т.д.
  }
})
</script>

<style scoped>
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
}

.primary {
  background: #4f46e5;
  color: white;
}

.primary:hover {
  background: #4338ca;
}

.secondary {
  background: #e5e7eb;
  color: #111827;
}

.secondary:hover {
  background: #d1d5db;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>