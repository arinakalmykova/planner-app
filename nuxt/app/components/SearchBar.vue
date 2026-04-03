<template>
  <Input
    :model-value="searchQuery"
    @input="emit('update:searchQuery', $event.target.value)"
    append-icon="mdi-magnify"
    label="Поиск"
  ></Input>
</template>

<script setup>
import Input from "../components/Input.vue";
defineProps({
  searchQuery: String,
});

const emit = defineEmits(["update:searchQuery"]);
</script>
