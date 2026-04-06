<template>
  <div class="main">
    <!-- Фильтры и поиск -->
    <TaskFilters
      :filter="filter"
      :searchQuery="searchQuery"
      :sortKey="sortKey"
      :sortAsc="sortAsc"
      :authorFilter="authorFilter"
      :priorityFilter="priorityFilter"
      :users="users"
      @update:filter="filter = $event"
      @update:search="searchQuery = $event"
      @update:sort="sortKey = $event"
      @update:author="authorFilter = $event"
      @update:priority="priorityFilter = $event"
      @toggle-sort="sortAsc = !sortAsc"
    />

    <!-- Заголовки таблицы -->
    <div class="section-titles">
      <div class="titles">
        <div class="left">
          <div class="title">Название</div>
        </div>
        <div class="right">
          <div class="title">Приоритет</div>
          <div class="title">Автор</div>
          <div class="title">Дата</div>
          <div class="title">Действия</div>
        </div>
      </div>
    </div>

    <!-- Список задач -->
    <div class="tasks-block">
      <template v-if="filteredTasks.length > 0">
        <TaskList :tasks="paginatedTasks" />
        <!-- Пагинация -->
        <Pagination
          v-if="totalPages > 1"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @prev="currentPage--"
          @next="currentPage++"
        />
      </template>
      <template v-else>
        <p v-if="tasks.length === 0">У вас пока нет задач</p>
        <p v-else>Результаты не найдены</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import debounce from "lodash.debounce";

import TaskList from "../components/TaskList.vue";
import TaskFilters from "../components/TaskFilters.vue";
import Pagination from "../components/Pagination.vue";

import taskStore from "../store/tasks";
import authStore from "../store/auth";

definePageMeta({
  middleware: "auth",
  layout: "main",
});

// Состояния
const searchQuery = ref("");
const debouncedSearch = ref("");
const filter = ref("all");
const sortKey = ref("dueDate");
const sortAsc = ref(true);
const authorFilter = ref("");
const priorityFilter = ref("");
const currentPage = ref(1);
const pageSize = ref(5);

// Данные
const tasks = computed(() => taskStore.state.tasks);
const users = computed(() => authStore.state.users);

// Загрузка данных при монтировании
onMounted(async () => {
  await authStore.dispatch("fetchUsers");
  await taskStore.dispatch("fetchTasks");
});

// Дебаунс для поиска
watch(
  searchQuery,
  debounce((val) => {
    debouncedSearch.value = val;
  }, 300)
);

// Фильтрация задач
const filteredTasks = computed(() => {
  let result = tasks.value;

  // Поиск
  if (debouncedSearch.value) {
    result = result.filter((task) =>
      task.title.toLowerCase().includes(debouncedSearch.value.toLowerCase())
    );
  }

  // Статус
  const now = new Date();
  if (filter.value === "active") {
    result = result.filter((task) => !task.isCompleted && new Date(task.dueDate) >= now);
  } else if (filter.value === "completed") {
    result = result.filter((task) => task.isCompleted);
  } else if (filter.value === "overdue") {
    result = result.filter((task) => !task.isCompleted && new Date(task.dueDate) < now);
  }

  // Автор
  if (authorFilter.value) {
    result = result.filter((task) => String(task.userId) === String(authorFilter.value));
  }

  if (priorityFilter.value) {
    result = result.filter((task) => task.priority === priorityFilter.value.toLowerCase());
  }

  result = result.sort((a, b) => {
    let valA = a[sortKey.value];
    let valB = b[sortKey.value];

    if (sortKey.value === "dueDate" || sortKey.value === "createdAt") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return sortAsc.value ? -1 : 1;
    if (valA > valB) return sortAsc.value ? 1 : -1;
    return 0;
  });

  return result;
});


watch([filteredTasks, searchQuery, authorFilter, filter, priorityFilter], () => {
  currentPage.value = 1;
});

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredTasks.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredTasks.value.length / pageSize.value));
</script>

<style scoped lang="scss">
.main {
  margin: 0 3em;
  display: flex;
  flex-direction: column;

  .section-titles {
    border-bottom: 1px solid $color-border;
    position: relative;
    z-index: 1000;

    .titles {
      display: flex;
      justify-content: space-between;
      margin: 0 200px 0 50px;
      gap: 50px;

      .right {
        display: flex;
        gap: 80px;
      }

      .title {
        padding: 20px;
      }
    }
  }

  .tasks-block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
}
</style>