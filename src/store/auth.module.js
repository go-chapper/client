import AuthService from '../services/auth.service'
import CryptoService from '../services/crypto.service'

export const auth = {
    namespaced: true,
    state: {
        jwt: '',
    },
    actions: {
        async login({ commit, rootState }, { username, password }) {
            let baseURL =
                rootState.homeServer != ''
                    ? rootState.homeServer
                    : rootState.setup.homeServer
            console.log(baseURL)

            return CryptoService.hashPassword(
                username,
                password,
                process.env.VUE_APP_PUBLIC_CLIENT_SALT
            )
                .then(hashedPassword => {
                    return AuthService.login(baseURL, username, hashedPassword)
                })
                .then(response => {
                    if (response.status == 200) {
                        commit('setJwt', response.data.token)
                    }
                    return response
                })
        },
        async register({ rootState }, { username, password, email }) {
            let baseURL =
                rootState.homeServer != ''
                    ? rootState.homeServer
                    : rootState.setup.homeServer
            console.log(baseURL)

            return CryptoService.hashPassword(
                username,
                password,
                process.env.VUE_APP_PUBLIC_CLIENT_SALT
            ).then(hashedPassword => {
                return AuthService.register(
                    baseURL,
                    username,
                    hashedPassword,
                    email
                )
            })
        },
    },
    mutations: {
        setJwt: (state, jwt) => {
            state.jwt = jwt
        },
    },
    getters: {
        getJwt: state => {
            return state.jwt
        },
    },
}
