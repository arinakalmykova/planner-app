<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      class="input-field"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' }, 
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: '' } // для label и input
})
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-label {
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.input-field {
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.input-field:focus {
  border-color: #4f46e5; /* красивый фиолетовый */
  outline: none;
}
</style>