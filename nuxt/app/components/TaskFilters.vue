<template>
  <div class="filters-section">
    <div class="status-buttons">
      <Button
        :class="{ active: filter === 'all' }"
        @click="$emit('update:filter', 'all')"
        >Все</Button
      >
      <Button
        :class="{ active: filter === 'active' }"
        @click="$emit('update:filter', 'active')"
        >Активные</Button
      >
      <Button
        :class="{ active: filter === 'completed' }"
        @click="$emit('update:filter', 'completed')"
        >Выполненные</Button
      >
      <Button
        :class="{ active: filter === 'overdue' }"
        @click="$emit('update:filter', 'overdue')"
        >Просроченные</Button
      >
    </div>

    <!-- SearchBar -->
    <SearchBar v-model="localSearch" />

    <div class="sorting-selects">
      <select v-model="localSortKey">
        <option value="dueDate">Дедлайн</option>
        <option value="createdAt">Дата создания</option>
      </select>

      <select v-model="localAuthorFilter">
        <option value="">Все авторы</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>

      <select v-model="localPriorityFilter">
        <option value="">Все приоритеты</option>
        <option value="Высокий">Высокий</option>
        <option value="Средний">Средний</option>
        <option value="Низкий">Низкий</option>
      </select>
    </div>

    <Button class="btn-fil" @click="$emit('toggle-sort')">{{
      sortAsc ? "По возрастанию" : "По убыванию"
    }}</Button>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
import SearchBar from "./SearchBar.vue";
import { ref, watch } from "vue";
import debounce from 'lodash.debounce';

const props = defineProps({
  filter: String,
  searchQuery: String,
  sortKey: String,
  sortAsc: Boolean,
  authorFilter: String,
  priorityFilter: String,
  users: Array,
});

const emit = defineEmits([
  "update:filter",
  "update:search",
  "update:sort",
  "update:author",
  "update:priority",
  "toggle-sort",
]);

const localSearch = ref(props.searchQuery);
const localSortKey = ref(props.sortKey);
const localAuthorFilter = ref(props.authorFilter);
const localPriorityFilter = ref(props.priorityFilter);

watch(
  () => props.searchQuery,
  (val) => {
    if (val !== localSearch.value) localSearch.value = val;
  }
);
watch(
  () => props.sortKey,
  (val) => (localSortKey.value = val),
);
watch(
  () => props.authorFilter,
  (val) => (localAuthorFilter.value = val),
);
watch(
  () => props.priorityFilter,
  (val) => (localPriorityFilter.value = val),
);

const emitSearch = debounce((val) => emit('update:search', val), 300);

watch(localSearch, (val) => emitSearch(val));
watch(localSortKey, (val) => emit("update:sort", val));
watch(localAuthorFilter, (val) => emit("update:author", val));
watch(localPriorityFilter, (val) => emit("update:priority", val));
</script>

<style scoped lang="scss">
.filters-section {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  align-items: center;
  padding: 20px 30px;
  background-color: $color-filter;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .status-buttons {
    display: flex;
    gap: 10px;

    button {
      padding: 8px 14px;
      border-radius: 6px;
      border: none;
      background-color: $color-button;
      color: $color-modal;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background-color: $color-button-hover;
        color: $color-modal;
      }

      &:hover:not(.active) {
        background-color: lighten($color-button, 10%);
      }
    }
  }

  .sorting-selects {
    display: flex;
    gap: 12px;
    align-items: center;

    select {
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid $color-border;
      background-color: $color-modal;
      font-size: 0.95rem;
      cursor: pointer;
      transition:
        border-color 0.2s,
        box-shadow 0.2s;

      &:hover {
        border-color: $color-primary;
      }

      &:focus {
        outline: none;
        border-color: $color-primary;
        box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
      }
    }
  }

  .btn-fil {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    text-wrap:nowrap;
    background-color: $color-primary;
    color: $color-modal;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: darken($color-primary, 5%);
    }
  }

  SearchBar {
    flex-grow: 1;
    min-width: 200px;
  }
}
</style>
