<template>
  <div class="main">
    <SearchBar v-model="searchQuery" />
    <div class="tasks-block">
      <template v-if="tasks.length > 0">
        <TaskList :tasks="filtredTasks"/>
      </template>
      <template v-else>
        <p>У вас пока нет маршрутов</p>
      </template>
      <Button @click="showDialog = true">mdi-plus-thick</Button>
    </div>
    <NewTaskDialog
      v-model="showDialog"
      @saved="refresh"
    />
  </div>
</template>

<script setup>
  import NewTaskDialog from '../components/NewTaskDialog.vue';
  import TaskList from '../components/TaskList.vue';
  import SearchBar from '../components/SearchBar.vue';
  import Button from '../components/Button.vue';
  import {ref,computed,onMounted} from "vue";
  import taskStore from '../store/tasks';

  definePageMeta({
    middleware: "auth",
    layout:"auth"
  });

  const showDialog = ref(false);
  const searchQuery = ref('');

  onMounted(async() => {
    if(!store.state.tasks.length){
      await taskStore.dispatch('fetchTasks');
    }
  });

  const tasks = computed(() => store.state.tasks);
  const refresh = async () => {
    await taskStore.dispatch('fetchTasks');
  };

  const filtredTasks = computed(() => {
    return tasks.value.filter(task => 
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });
</script>

<style scoped lang="scss">
.main {
    padding-top: 3em;
    display: flex;
    flex-direction: column;
    gap: 30px;

    .tasks-block {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
}
</style>