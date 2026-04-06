<template>
  <div class="search">
    <Input
      :model-value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="search-input"
    />
    <i class="mdi mdi-magnify icon"></i>
  </div>
</template>

<script setup>
import Input from "../components/Input.vue";

defineProps({
  modelValue: String, 
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.search {
  position: relative;
  width: 100%;
  
  .icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
}
</style>
