import axios from 'axios'

class Signaling {
    constructor() {
        this.host = window.location.hostname
        this.token = ''
        this.closed = true
        this.socket = null
        this.username = ''
        this.onMessageFn = null

        // Bind this to handler functions, duh
        this._boundOnOpen = this._onOpen.bind(this)
        this._boundOnMessage = this._onMessage.bind(this)
    }

    // Connect retrieves an auth token and connects to a websocket
    Connect(username, jwt) {
        if (username == '') {
            throw 'Username cannot be empty'
        }

        this.username = username
        this._token(jwt)
        this._open()
        return this
    }

    // Disconnect closes the websocket connection
    Disconnect() {
        this._close
    }

    // Token retrieves an auth token, this is covered by Connect
    Token(jwt) {
        return this._token(jwt)
    }

    // OnMessage triggers the callback method 'fn' when the websocket retrieves a message
    OnMessage(fn) {
        this.onMessageFn = fn
    }

    // SendChatOffer sends a new chat offer to callee
    SendChatOffer(to) {
        this.socket.send(
            JSON.stringify({
                topic: 'new-chat-offer',
                from: this.username,
                to: to,
            })
        )
    }

    SendTextOffer(to, sdp) {
        this.socket.send(
            JSON.stringify({
                topic: 'text-offer',
                from: this.username,
                to: to,
                sdp: sdp,
            })
        )
    }

    _token(jwt) {
        axios
            .get('/signaling/token', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then(res => {
                this.token = res.data.token
                return res.data.token
            })
            .catch(error => {
                throw error
            })
    }

    _open() {
        this.socket = new WebSocket(`ws://${this.host}/signaling/ws`)
        this.socket.addEventListener('open', this._boundOnOpen)
        this.socket.addEventListener('message', this._boundOnMessage)
        this.closed = false
    }

    _close() {
        if (this.closed) {
            return
        }

        this.socket.close()
        this.socket.removeEventListener('open', this._boundOnOpen)
        this.socket.removeEventListener('message', this._boundOnMessage)
        this.closed = true
        console.info('[Signaling] ❌ Closed signaling websocket')
    }

    _onOpen() {
        console.info('[Signaling] 📡 Opened signaling websocket')
        this.socket.send(
            JSON.stringify({
                topic: 'subscribe',
                username: this.username,
                token: this.token,
            })
        )
        console.info('[Signaling] 📩 Subscribed')
    }

    _onMessage(e) {
        this.onMessageFn(e)
    }
}

export default new Signaling()
