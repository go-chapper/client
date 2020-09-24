import CryptoService from '../../services/crypto.service'
import KeyService from '../../services/key.service'
import localforage from 'localforage'

localforage.setDriver(localforage.INDEXEDDB)

export const keys = {
    namespaced: true,
    state: {
        public_keys: new Map(),
    },
    actions: {
        async generateKeypair() {
            const keypair = await CryptoService.generateKeypair()
            const publicKey = await CryptoService.exportSPKI(keypair.publicKey)

            return localforage
                .setItem('chapper-keypair', keypair)
                .then(() => {
                    return jsonEscape(publicKey)
                })
                .catch(error => {
                    console.error(error)
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
                    return publickey
                }
            )
        },
    },
    mutations: {
        setPublickey: (state, { username, publickey }) => {
            state.public_keys.set(username, publickey)
        },
    },
    getters: {
        getPublickey: state => username => {
            return state.public_keys.get(username)
        },
    },
}

function jsonEscape(str) {
    return str
        .replace(/\n/g, '\\\\n')
        .replace(/\r/g, '\\\\r')
        .replace(/\t/g, '\\\\t')
}
