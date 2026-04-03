import { createStore } from "vuex";
import { apiAuthRequest } from "../utils/api";

const authStore = createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setAuth(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const data = await apiAuthRequest("/login", {
          method: "POST",
          body: credentials,
        });

        commit("setAuth", data);
      } catch (err) {
        console.error("Login error:", err);
      }
    },
    async register({ commit }, credentials) {
      try {
        const data = await apiAuthRequest("/register", {
          method: "POST",
          body: credentials,
        });

        commit("setAuth", data);
      } catch (err) {
        console.error("Register error:", err);
      }
    },
  },
  getters: {
    isAuth: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});

export default authStore;
