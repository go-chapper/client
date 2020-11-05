import CryptoService from '../../services/crypto.service'
import KeyService from '../../services/key.service'
import localforage from 'localforage'

localforage.setDriver(localforage.INDEXEDDB)

export const keys = {
    namespaced: true,
    state: {
        publicKeys: Object,
    },
    actions: {
        async generateKeypair() {
            const keypair = await CryptoService.generateKeypair()
            const publicKey = await CryptoService.exportSPKI(keypair.publicKey)

            return localforage
                .setItem('chapper-keypair', keypair)
                .then(() => {
                    return Promise.resolve(publicKey)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        async getPrivateKey() {
            return localforage
                .getItem('chapper-keypair')
                .then(keypair => {
                    return Promise.resolve(keypair.privateKey)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        async getPublicKey({ commit, state, rootState }, { username, jwt }) {
            if (state.publicKeys[username] != undefined) {
                return state.publicKeys[username]
            }

            let baseURL = rootState.homeServer
            return KeyService.getPublicKey(baseURL, username, jwt).then(
                publickey => {
                    commit('setPublickey', { username, publickey })
                    return publickey
                }
            )
        },
        reset({ commit }) {
            commit('reset')
        },
    },
    mutations: {
        reset: state => {
            state.publicKeys = Object
        },
        setPublickey: (state, { username, publickey }) => {
            state.publicKeys[username] = publickey
        },
    },
    getters: {
        getPublickey: state => username => {
            return state.publicKeys[username]
        },
    },
}

// function jsonEscape(str) {
//     return str
//         .replace(/\n/g, '\\\\n')
//         .replace(/\r/g, '\\\\r')
//         .replace(/\t/g, '\\\\t')
// }
