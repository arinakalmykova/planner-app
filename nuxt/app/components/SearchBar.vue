<template>
  <div class="search">
    <Input
      :model-value="searchQuery"
      @input="emit('update:searchQuery', $event.target.value)"
      class="search-input"
    ></Input>
    <i class="mdi mdi-magnify icon"></i>
  </div>
</template>

<script setup>
import Input from "../components/Input.vue";
defineProps({
  searchQuery: String,
});

const emit = defineEmits(["update:searchQuery"]);
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
