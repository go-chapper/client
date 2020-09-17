import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homeServer: '',
        user: {
            username: '',
            jwt: '',
        },
        setup: {
            homeServer: '',
        },
    },
    plugins: [createPersistedState()],
    mutations: {
        setHomeServer: (state, name) => {
            state.homeServer = name
        },
        setUser: (state, user) => {
            state.user = user
        },
        setUserUsername: (state, username) => {
            state.user.username = username
        },
        setUserJWT: (state, jwt) => {
            state.user.jwt = jwt
        },
        setSetupHomeServer: (state, address) => {
            state.setup.homeServer = address
        },
    },
    getters: {
        getHomeServer: state => {
            return state.homeServer
        },
        getUser: state => {
            return state.user
        },
        getUserUsername: state => {
            return state.user.username
        },
        getUserJWT: state => {
            return state.user.jwt
        },
        getSetupHomeServer: state => {
            return state.setup.homeServer
        },
    },
    actions: {},
    modules: {},
})
