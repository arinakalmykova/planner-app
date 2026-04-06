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
const props = defineProps({
  modelValue: { type: String, default: '' }, 
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: '' } 
})
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  gap:10px;
  width:100%;

  .input-label {
    margin-bottom: 0.1em;
    font-weight: 500;
  }

  .input-field {
    padding: 0.5rem 0.8rem;
    border: 1px solid $color-border;
    border-radius: 4px;
    font-size: 1rem;
    width:100%;
    box-sizing:border-box;
  }

  .input-field:focus {
    border-color: $color-button; 
    outline: none;
  }
}
</style>