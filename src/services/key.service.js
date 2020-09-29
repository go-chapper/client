import axios from 'axios'

class KeyService {
    async getPublicKey(baseURL, username, jwt) {
        const url = new URL(`/key/${username}`, baseURL)

        return axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(response => {
                return response.data
            })
    }
}

export default new KeyService()
