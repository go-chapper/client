import AuthService from '../../services/auth.service'
import CryptoService from '../../services/crypto.service'

export const auth = {
    namespaced: true,
    state: {
        jwt: '',
        claims: null,
    },
    actions: {
        async login({ commit, rootState }, { username, password }) {
            let baseURL =
                rootState.homeServer != ''
                    ? rootState.homeServer
                    : rootState.setup.homeServer

            return CryptoService.hashPassword(password, username)
                .then(hashedPassword => {
                    hashedPassword = CryptoService.string(hashedPassword)
                    return AuthService.login(baseURL, username, hashedPassword)
                })
                .then(response => {
                    if (response.status == 200) {
                        commit('setJwt', response.data.token)

                        // Set claims
                        const parts = response.data.token.split('.')
                        const claims = JSON.parse(atob(parts[1]))
                        commit('setClaims', claims)
                    }
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        async register(
            { rootState },
            { username, password, email, publicKey }
        ) {
            let baseURL =
                rootState.homeServer != ''
                    ? rootState.homeServer
                    : rootState.setup.homeServer

            return CryptoService.hashPassword(password, username)
                .then(hashedPassword => {
                    hashedPassword = CryptoService.string(hashedPassword)
                    return AuthService.register(
                        baseURL,
                        username,
                        hashedPassword,
                        email,
                        publicKey
                    )
                })
                .then(response => {
                    return Promise.resolve(response)
                })
                .catch(error => {
                    return Promise.reject(error)
                })
        },
        reset({ commit }) {
            commit('reset')
        },
    },
    mutations: {
        reset: state => {
            state.jwt = ''
            state.claims = null
        },
        setJwt: (state, jwt) => {
            state.jwt = jwt
        },
        setClaims: (state, claims) => {
            state.claims = claims
        },
    },
    getters: {
        getJwt: state => {
            return state.jwt
        },
        getClaims: state => {
            return state.claims
        },
        getUsername: state => {
            return state.claims.username
        },
    },
}
