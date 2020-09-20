import axios from 'axios'

class KeyService {
    async getPublicKey(baseURL, username) {
        const url = new URL(`/key/${username}`, baseURL)

        return axios.get(url).then(response => {
            return response
        })
    }
}

export default new KeyService()
