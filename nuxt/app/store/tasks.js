import { createStore } from "vuex";

const store = createStore({
  state: {
    routes: [],
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes;
    },
    addRoute(state, route) {
      state.routes.push(route);
    },
    updateRoute(state, updatedRoute) {
      const index = state.routes.findIndex((r) => r.id === updatedRoute.id);
      if (index !== -1) {
        state.routes[index] = updatedRoute;
      }
    },
    deleteRoute(state, id) {
      state.routes = state.routes.filter((i) => i.id !== id);
    },
    addPoint(state, { routeId, point }) {
      const route = state.routes.find((r) => r.id === routeId);
      if (route) {
        if (!route.points) route.points = [];
        route.points.push(point);
      }
    },
    updatePoint(state, { routeId, pointId, data }) {
      const route = state.routes.find((r) => r.id === routeId);
      if (!route?.points) return;
      const index = route.points.findIndex((p) => p.id === pointId);
      if (index !== -1) {
        route.points[index] = { ...route.points[index], ...data };
      }
    },
    deletePoint(state, { routeId, pointId }) {
      const route = state.routes.find((r) => r.id === routeId);
      if (!route?.points) return;
      route.points = route.points.filter((p) => p.id !== pointId);
    },
  },
  actions: {
    async fetchRoutes({ commit }) {
      const data = await $fetch("http://localhost:3001/routes");
      commit("setRoutes", data);
    },
    async createRoute({ commit }, route) {
      const newRoute = await $fetch("http://localhost:3001/routes", {
        method: "POST",
        body: route,
      });
      commit("addRoute", newRoute);
    },
    async updateRoute({ commit }, { routeId, route }) {
      const updatedRoute = await $fetch(`http://localhost:3001/routes/${routeId}`, {
        method: "PUT",
        body: route,
      });
      commit("updateRoute", updatedRoute );
    },
    async deleteRoute({ commit }, id) {
      await $fetch(`http://localhost:3001/routes/${id}`, {
        method: "DELETE",
      });
      commit("deleteRoute", id);
    },
    async addPoint({ commit }, { routeId, formData }) {
      const newPoint = await $fetch(
        `http://localhost:3001/routes/${routeId}/points`,
        {
          method: "POST",
          body: formData,
        },
      );
      commit("addPoint", { routeId, point: newPoint });
    },
    async updatePoint({ commit }, { routeId, pointId, data }) {
      const updatedPoint = await $fetch(
        `http://localhost:3001/routes/${routeId}/points/${pointId}`,
        { method: "PUT", body: data },
      );
      commit("updatePoint", { routeId, pointId, data: updatedPoint });
    },
    async deletePoint({ commit }, { routeId, pointId }) {
      await $fetch(
        `http://localhost:3001/routes/${routeId}/points/${pointId}`,
        {
          method: "DELETE",
        },
      );
      commit("deletePoint", { routeId, pointId });
    },
  },
  getters: {
    getRouteById: (state) => (id) => state.routes.find((r) => r.id === id),
  },
});

export default store;
