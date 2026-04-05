import { createStore } from "vuex";
import { apiTaskRequest } from "../utils/api";
import uiStore from "./ui";

const taskStore = createStore({
  state: {
    tasks: [],
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) state.tasks[index] = updatedTask;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
  },

  actions: {
    async fetchTasks({ commit }) {
      uiStore.commit("setLoading", true);
      uiStore.commit("clearError");

      try {
        const data = await apiTaskRequest("/tasks");
        commit("setTasks", data);
      } catch (err) {
        uiStore.commit("setError", {
          message: err.message || "Ошибка загрузки задач",
          retryFn: () => taskStore.dispatch("fetchTasks"),
        });
      } finally {
        uiStore.commit("setLoading", false);
      }
    },

    async createTask({ commit }, task) {
      uiStore.commit("setLoading", true);
      uiStore.commit("clearError");

      try {
        const newTask = await apiTaskRequest("/tasks", {
          method: "POST",
          body: task,
        });
        commit("addTask", newTask);
      } catch (err) {
        uiStore.commit("setError", {
          message: err.message || "Ошибка создания задачи",
          retryFn: () => taskStore.dispatch("createTask", task),
        });
      } finally {
        uiStore.commit("setLoading", false);
      }
    },

    async updateTask({ commit }, task) {
      uiStore.commit("setLoading", true);
      uiStore.commit("clearError");

      try {
        const updatedTask = await apiTaskRequest(`/tasks/${task.id}`, {
          method: "PUT",
          body: task,
        });
        commit("updateTask", updatedTask);
      } catch (err) {
        uiStore.commit("setError", {
          message: err.message || "Ошибка обновления задачи",
          retryFn: () => taskStore.dispatch("updateTask", task),
        });
      } finally {
        uiStore.commit("setLoading", false);
      }
    },

    async deleteTask({ commit }, id) {
      uiStore.commit("setLoading", true);
      uiStore.commit("clearError");

      try {
        await apiTaskRequest(`/tasks/${id}`, { method: "DELETE" });
        commit("deleteTask", id);
      } catch (err) {
        uiStore.commit("setError", {
          message: err.message || "Ошибка удаления задачи",
          retryFn: () => taskStore.dispatch("deleteTask", id),
        });
      } finally {
        uiStore.commit("setLoading", false);
      }
    },
  },

  getters: {
    allTasks: (state) => state.tasks,
    getTaskById: (state) => (id) => state.tasks.find((t) => t.id === id),
  },
});

export default taskStore;