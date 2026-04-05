import { createStore } from "vuex";

const uiStore = createStore({
  state: () => ({
    loading: false,
    error: null,
    retryFn: null, 
  }),

  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, payload) {
      state.error = payload.message;
      state.retryFn = payload.retryFn || null;
    },
    clearError(state) {
      state.error = null;
      state.retryFn = null;
    },
  },
});

export default uiStore;