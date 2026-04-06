import { createStore } from "vuex";
import { apiAuthRequest } from "../utils/api";
import uiStore from "./ui";

const authStore = createStore({
  state: {
    user: null,
    token: null,
    users: [],
  },

  mutations: {
    setAuth(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUsers(state, users) {
      state.users = users;
    },
  },

  actions: {
    async login({ commit }, credentials) {
      uiStore.commit("setLoading", true);
      uiStore.commit("clearError");

      try {
        const data = await apiAuthRequest("/login", {
          method: "POST",
          body: credentials,
        });
        commit("setAuth", data);
      } catch (err) {
        uiStore.commit("setError", {
          message: err.message || "Ошибка входа",
          retryFn: () => authStore.dispatch("login", credentials),
        });
      } finally {
        uiStore.commit("setLoading", false);
      }
    },

    async register({ commit }, credentials) {
      uiStore.commit("setLoading", true);
      uiStore.commit("clearError");

      try {
        const data = await apiAuthRequest("/register", {
          method: "POST",
          body: credentials,
        });
        commit("setAuth", data);
      } catch (err) {
        uiStore.commit("setError", {
          message: err.message || "Ошибка регистрации",
          retryFn: () => authStore.dispatch("register", credentials),
        });
      } finally {
        uiStore.commit("setLoading", false);
      }
    },

    async fetchUsers({ commit }) {
      uiStore.commit("setLoading", true);
      try {
        const data = await apiAuthRequest("/users"); 
        commit("setUsers", data);
      } finally {
        uiStore.commit("setLoading", false);
      }
    },
  },

  getters: {
    isAuth: (state) => !!state.token,
    getUser: (state) => state.user,
    getUserById: (state) => (id) => {
      return state.users?.find((user) => user.id === id) || null;
    },
  },
});

export default authStore;
