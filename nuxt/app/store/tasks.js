import { createStore } from "vuex";
import { apiTaskRequest } from "../utils/api";

const taskStore = createStore({
  state: {
    tasks: [],
    loading: false,
  },

  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },

    addTask(state, task) {
      state.tasks.push(task);
    },

    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },

    deleteTask(state, id) {
      state.tasks = state.tasks.filter(t => t.id !== id);
    },

    setLoading(state, value) {
      state.loading = value;
    },
  },

  actions: {
    async fetchTasks({ commit }) {
      commit("setLoading", true);

      try {
        const data = await apiTaskRequest("/tasks");
        commit("setTasks", data);
      } finally {
        commit("setLoading", false);
      }
    },

    async createTask({ commit }, task) {
      const newTask = await apiTaskRequest("/tasks", {
        method: "POST",
        body: task,
      });

      commit("addTask", newTask);
    },

    async updateTask({ commit }, task) {
      const updatedTask = await apiTaskRequest(`/tasks/${task.id}`, {
        method: "PUT",
        body: task,
      });

      commit("updateTask", updatedTask);
    },

    async deleteTask({ commit }, id) {
      await apiTaskRequest(`/tasks/${id}`, {
        method: "DELETE",
      });

      commit("deleteTask", id);
    },
  },

  getters: {
    allTasks: (state) => state.tasks,
  },
});

export default taskStore;