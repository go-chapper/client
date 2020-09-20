import CryptoService from '../../services/crypto.service'
import KeyService from '../../services/key.service'

export const keys = {
    namespaced: true,
    state: {
        public_keys: new Map(),
        keypair: null,
    },
    actions: {
        async generateKeypair({ commit }) {
            return CryptoService.generateKeypair().then(keypair => {
                commit('setKeypair', keypair)
            })
        },
        async getPublickey({ commit, rootState }, username) {
            let baseURL =
                rootState.homeServer != ''
                    ? rootState.homeServer
                    : rootState.setup.homeServer

            return KeyService.getPublicKey(baseURL, username).then(
                publickey => {
                    commit('setPublickey', { username, publickey })
                }
            )
        },
    },
    mutations: {
        setKeypair: (state, keypair) => {
            state.keypair = keypair
        },
        setPublickey: (state, { username, publickey }) => {
            state.public_keys.set(username, publickey)
        },
    },
    getters: {
        getKeypair: state => {
            return state.keypair
        },
        getPublickey: state => username => {
            return state.public_keys.get(username)
        },
    },
}
