import {createStore} from "vuex";

const store = createStore({
    state: {
        routes: []
    },
    mutations: {
        setRoutes(state,routes){
            state.routes = routes;
        },
        addRoute(state,route){
            state.routes.push(route)
        },
        updateRoute(state,updateRoute){
            const index = state.routes.findIndex(r => r.id === updatedRoute.id)
            if (index !== -1) {
                state.routes[index] = updatedRoute
            }
        },
        deleteRoute(state,id){
            state.routes = state.routes.filter( i => i.id !== id)
        },
    },
    actions: {
        async fetchRoutes({ commit }) {
            const data = await $fetch('http://localhost:3001/routes')
            commit('setRoutes', data)
        },
        async createRoute({ commit }, route) {
            const newRoute = await $fetch('http://localhost:3001/routes', {
                method: 'POST',
                body: route
            })
            commit('addRoute', newRoute)
        },
        async updateRoute({ commit }, route) {
            const updatedRoute = await $fetch('http://localhost:3001/routes', {
                method: 'PUT',
                body: route
            })
            commit('updateRoute', updatedRoute)
        }, 
        async deleteRoute({ commit }, id) {
            await $fetch('http://localhost:3001/routes', {
                method: 'DELETE',
                body: route
            })
            commit('deleteRoute', id)
        }
    },
    getters: {
        getRouteById: (state) => (id) => state.routes.find(r => r.id === id)
    }
});

export default store;