<template>
  <div class="main">
    <div class="section">
      <div class="filters">
        <Button :class="{ active: filter === 'all' }" @click="filter = 'all'"
          >Все</Button
        >
        <Button
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
          >Активные</Button
        >
        <Button
          :class="{ active: filter === 'completed' }"
          @click="filter = 'completed'"
          >Выполненные</Button
        >
        <Button
          :class="{ active: filter === 'overdue' }"
          @click="filter = 'overdue'"
          >Просроченные</Button
        >
      </div>
      <SearchBar v-model="searchQuery" />
      <div class="sorting">
        <div class="sort-type">
          <label>Сортировать по:</label>
          <select v-model="sortKey">
            <option value="dueDate">Дедлайн</option>
            <option value="createdAt">Дата создания</option>
            <option value="isCompleted">Статус</option>
          </select>
        </div>
        <Button @click="sortAsc = !sortAsc">{{
          sortAsc ? "По возрастанию" : "По убыванию"
        }}</Button>
      </div>
    </div>
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
    <div class="tasks-block">
      <template v-if="filteredTasks.length > 0">
        <TaskList :tasks="filteredTasks" />
      </template>
      <template v-else>
        <p>У вас пока нет задач</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import TaskList from "../components/TaskList.vue";
import SearchBar from "../components/SearchBar.vue";
import Button from "../components/Button.vue";
import { ref, computed, onMounted } from "vue";
import taskStore from "../store/tasks";

definePageMeta({
  middleware: "auth",
  layout: "main",
});

const searchQuery = ref("");
const filter = ref("all");
const sortKey = ref("dueDate");
const sortAsc = ref(true);

onMounted(async () => {
  await taskStore.dispatch("fetchTasks");
});

const tasks = computed(() => taskStore.state.tasks);

const filteredTasks = computed(() => {
  let result = tasks.value;

  if (searchQuery.value) {
    result = result.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  const now = new Date();
  if (filter.value === "active") {
    result = result.filter(
      (task) => !task.isCompleted && new Date(task.dueDate) >= now,
    );
  } else if (filter.value === "completed") {
    result = result.filter((task) => task.isCompleted);
  } else if (filter.value === "overdue") {
    result = result.filter(
      (task) => !task.isCompleted && new Date(task.dueDate) < now,
    );
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
</script>

<style scoped lang="scss">
.main {
  margin: 0 3em;
  display: flex;
  flex-direction: column;

  .section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
    background-color: $color-filter;
    padding: 20px;

    .filters {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .sorting {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      text-wrap: nowrap;

      .sort-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-wrap: nowrap;
        gap: 10px;
      }
    }

    .filters Button.active {
      background-color: $color-button-hover;
      color: $color-bg;
    }
  }
  .section-titles {
    border-bottom: 1px solid $color-border;

    .titles {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 50px;
      margin: 0 200px 0 50px;
    }

    .right {
      display: flex;
      flex-direction: row;
      gap:70px;
    }

    .title {
      padding: 20px;
    }
  }

  .tasks-block {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
