import ServersService from '../../services/servers.service'

export const servers = {
    namespaced: true,
    state: {
        servers: Array,
    },
    actions: {
        createOne(servername) {
            return ServersService.createServer(servername)
        },
        getAll({ commit, state, rootState }, force) {
            if (state.servers.length != 0 && !force) {
                return state.servers
            }

            const baseURL =
                rootState.homeServer != ''
                    ? rootState.homeServer
                    : rootState.setup.homeServer
            const jwt = rootState.auth.jwt

            return ServersService.getServers(baseURL, jwt)
                .then(servers => {
                    commit('setServers', servers)
                })
                .catch(error => {
                    return error
                })
        },
    },
    mutations: {
        setServers: (state, servers) => {
            state.servers = servers
        },
    },
}
