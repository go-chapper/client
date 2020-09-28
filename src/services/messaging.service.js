import axios from 'axios'

class Messaging {
    constructor() {
        this.ws = null
        this.url = null
        this.host = ''
        this.username = ''

        // Bind this to handler functions, duh
        this._boundOnOpen = this._onOpen.bind(this)
        this._boundOnMessage = this._onMessage.bind(this)
    }

    connect(url, username, jwt) {
        return new Promise((resolve, reject) => {
            if (url == '' || username == '' || jwt == '') {
                reject('URL, username or jwt is empty')
            }

            this._aquireToken(url, jwt)
                .then(() => {
                    this.username = username
                    this._open()
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    async _aquireToken(url, jwt) {
        this.url = new URL(url)
        this.host = this.url.host
        const messageURL = new URL('/messaging/token', this.url)

        return axios
            .get(messageURL, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(res => {
                this.token = res.data.token
                return res.data.token
            })
            .catch(error => {
                return error
            })
    }

    _open() {
        this.ws = new WebSocket(`ws://${this.host}/signaling/ws`)
        this.ws.addEventListener('open', this._boundOnOpen)
        this.ws.addEventListener('message', this._boundOnMessage)
    }

    _onOpen() {
        console.info('[Messaging] 📡 Opened signaling websocket')
        this.socket.send(
            JSON.stringify({
                topic: 'subscribe',
                username: this.username,
                token: this.token,
            })
        )
        console.info('[Messaging] 📩 Subscribed')
    }

    _onMessage(e) {
        console.log(e)
    }
}

export default new Messaging()
