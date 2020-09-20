import axios from 'axios'

class AuthService {
    // login hits up the auth/login endpoint to login the user with the provided username
    // and password
    login(baseURL, username, password) {
        const url = new URL('/auth/login', baseURL)

        return axios
            .post(url, {
                username: username,
                password: password,
            })
            .then(response => {
                return response
            })
    }

    // register hits up the auth/register endpoint to register a new user with the
    // provided username and password
    register(baseURL, username, password, email) {
        const url = new URL('/auth/register', baseURL)

        return axios
            .post(url, {
                username: username,
                password: password,
                email: email,
            })
            .then(
                response => {
                    return response
                },
                error => {
                    return error.response
                }
            )
    }
}

export default new AuthService()
