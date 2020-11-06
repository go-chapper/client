import axios from 'axios'

class ServersService {
    // createServer hits up the API to create a new virtual server
    async createServer(serverName) {
        const url = new URL('/api/v1/servers', this.baseURL)

        return axios
            .put(url, {
                name: serverName,
            })
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    // getServer returns one virtual server identified by its hash
    async getServer(serverHash) {
        const url = new URL(`/api/v1/servers/${serverHash}`, this.baseURL)

        return axios
            .get(url)
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }

    // getServers returns all virtual servers
    async getServers(baseURL, jwt) {
        const url = new URL('/api/v1/servers', baseURL)

        return axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(response => {
                return response.data
            })
            .catch(error => {
                return error
            })
    }

    // getServers returns all virtual servers
    async getUserServers(baseURL, jwt) {
        const url = new URL('/api/v1/me/servers', baseURL)

        return axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(response => {
                return Promise.resolve(response)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    updateServer() {}

    deleteServer(serverHash) {
        const url = new URL(`/api/v1/servers/${serverHash}`, this.baseURL)

        return axios.delete(url, {})
    }
}

export default new ServersService()
