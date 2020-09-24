import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth } from './modules/auth.module'
import { keys } from './modules/keys.module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homeServer: '',
        setup: {
            homeServer: '',
        },
    },
    plugins: [createPersistedState()],
    mutations: {
        setHomeServer: (state, name) => {
            state.homeServer = name
        },
        setSetupHomeServer: (state, address) => {
            state.setup.homeServer = address
        },
    },
    getters: {
        getHomeServer: state => {
            return state.homeServer
        },
        getHomeServerHost: state => {
            return new URL(state.homeServer).hostname
        },
        getSetupHomeServer: state => {
            return state.setup.homeServer
        },
    },
    actions: {},
    modules: {
        auth,
        keys,
    },
})
