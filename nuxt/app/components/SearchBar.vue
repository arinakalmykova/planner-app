<template>
  <v-text-field
    :model-value="searchQuery"
    @input="emit('update:searchQuery', $event.target.value)"
    append-icon="mdi-magnify"
    label="Поиск"
  ></v-text-field>
</template>

<script setup>
    defineProps({
      searchQuery: String
    });

    const emit = defineEmits(['update:searchQuery']);
</script>
