import axios from 'axios'

class Messaging {
    constructor() {
        this.ws = null
        this.url = null
        this.host = ''
        this.username = ''
        this.receiveMessageCallback = null

        // Bind this to handler functions, duh
        this.boundOnOpenFn = this.onOpenFn.bind(this)
        this.boundOnCloseFn = this.onCloseFn.bind(this)
        this.boundOnMessageFn = this.onMessageFn.bind(this)
    }

    // connect connects to the messaging websocket
    connect(url, username, jwt) {
        return new Promise((resolve, reject) => {
            if (url == '' || username == '' || jwt == '') {
                reject('URL, username or jwt is empty')
            }

            this.url = url

            this.aquireToken(jwt)
                .then(() => {
                    this.username = username
                    this.openWebsocket()
                    resolve('Connected')
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    disconnect() {
        this.closeWebsocket()
    }

    // sendMessage sends a message via the websocket
    sendMessage(message) {
        this.ws.send(JSON.stringify(message))
    }

    // onMessage registers a callback to execute when receiving incoming messages
    onMessage(fn) {
        this.receiveMessageCallback = fn
    }

    // aquireToken aquires a auth token to subscribe to the websocket
    async aquireToken(jwt) {
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

    // openWebsocket opens the websocket
    openWebsocket() {
        this.ws = new WebSocket(`ws://${this.url.host}/messaging/ws`)
        this.ws.addEventListener('open', this.boundOnOpenFn)
        this.ws.addEventListener('close', this.boundOnCloseFn)
        this.ws.addEventListener('message', this.boundOnMessageFn)
    }

    closeWebsocket() {
        // TODO <2020/29/09>: Do we need to add a code or reason?
        this.ws.close()
    }

    // onOpenFn gets executed when the websocket was opened. It subsribes the user to the
    // broadcaster hub
    onOpenFn() {
        console.info('[Messaging] 📡 Opened signaling websocket')
        this.ws.send(
            JSON.stringify({
                type: 'subscribe',
                username: this.username,
                token: this.token,
            })
        )
        console.info('[Messaging] 📩 Subscribed')
    }

    // onMessageFn gets executed when receiving incoming messages
    onMessageFn(e) {
        this.receiveMessageCallback(e)
    }

    onCloseFn() {
        this.ws.removeEventListener('open', this.boundOnOpenFn)
        this.ws.removeEventListener('close', this.boundOnCloseFn)
        this.ws.removeEventListener('message', this.boundOnMessageFn)

        this.reset()
        console.info('[Messaging] ❌ Closed')
    }

    reset() {
        this.ws = null
        this.url = null
        this.host = ''
        this.username = ''
        this.receiveMessageCallback = null
    }
}

export default new Messaging()
