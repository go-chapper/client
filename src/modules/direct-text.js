import MessagingService from '../services/messaging.service'
import CryptoService from '../services/crypto.service'

import store from '../store'

export default class DirectText {
    constructor(options) {
        if (!(options instanceof Object)) {
            return
        }

        this.baseURL = new URL(store.getters.getHomeServer)
        this.connected = false
        this.onMessageCallback = null

        this.boundOnMessageFn = this.onMessageFn.bind(this)
    }

    // connect connects to the underlying messaging service
    async connect() {
        if (this.connected) {
            return Promise.reject('Already connected')
        }

        const username = store.getters['auth/getUsername']
        const jwt = store.getters['auth/getJwt']

        return MessagingService.connect(this.baseURL, username, jwt)
            .then(() => {
                MessagingService.onMessage(this.boundOnMessageFn)
                this.connected = true
            })
            .catch(error => {
                return error
            })
    }

    // disconnect disconnects the chat from the messaging service
    disconnect() {
        if (!this.connected) {
            return
        }

        MessagingService.disconnect()
        this.connected = false
    }

    onMessage(fn) {
        this.onMessageCallback = fn
    }

    async sendMessage(message) {
        if (!(message instanceof Object)) {
            console.error('Message must be object')
            return
        }

        if (message.from == '' || message.to == '' || message.data == '') {
            return
        }

        // Encrypt data
        // Create ArrayBuffer of payload
        const payload = CryptoService.buffer(message.data)
        const jwt = store.getters['auth/getJwt']
        const username = message.to

        // Get public key of receiver
        return store
            .dispatch('keys/getPublicKey', { username, jwt })
            .then(publicKey => {
                return CryptoService.importSPKI(publicKey)
            })
            .then(publicKey => {
                // Encrypt with public key
                return CryptoService.encryptWithPublickey(payload, publicKey)
            })
            .then(encrypted => {
                // Send encrypted message
                message.data = CryptoService.string(encrypted)
                MessagingService.sendMessage(message)
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    async onMessageFn(e) {
        const message = JSON.parse(e.data)
        const ciphertext = CryptoService.buffer(message.data)
        const self = this

        store
            .dispatch('keys/getPrivateKey')
            .then(privateKey => {
                console.log(privateKey)
                return CryptoService.decryptWithPrivateKey(
                    ciphertext,
                    privateKey
                )
            })
            .then(decrypted => {
                console.log(decrypted)
                self.onMessageCallback(decrypted)
            })
            .catch(error => {
                return error
            })
    }
}
