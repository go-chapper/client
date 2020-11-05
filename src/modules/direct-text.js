import MessagingService from '../services/messaging.service'
import CryptoService from '../services/crypto.service'

import store from '../store'

export default class DirectText {
    constructor(options) {
        if (!(options instanceof Object)) {
            return
        }

        this.baseURL = null
        this.connected = false
        this.onMessageCallback = null

        this.boundOnMessageFn = this.onMessageFn.bind(this)
    }

    // connect connects to the underlying messaging service
    async connect() {
        if (this.connected) {
            return Promise.reject('Already connected')
        }

        if (this.baseURL == null) {
            this.baseURL = new URL(store.getters.getHomeServer)
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
        const payload = CryptoService.str2ab(message.data)
        const jwt = store.getters['auth/getJwt']
        const username = message.to

        // Get public key of receiver
        return store
            .dispatch('keys/getPublicKey', { username, jwt })
            .then(public_key => {
                return CryptoService.importSPKI(public_key)
            })
            .then(public_key => {
                // Encrypt with public key
                return CryptoService.encryptWithPublickey(public_key, payload)
            })
            .then(encrypted => {
                // Send encrypted message
                message.data = CryptoService.ab2str(encrypted)
                MessagingService.sendMessage(message)
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    async onMessageFn(e) {
        const message = JSON.parse(e.data)
        const ciphertext = CryptoService.str2ab(message.data)

        store
            .dispatch('keys/getPrivateKey')
            .then(private_key => {
                return CryptoService.decryptWithPrivateKey(
                    private_key,
                    ciphertext
                )
            })
            .then(decrypted => {
                this.onMessageCallback(CryptoService.ab2str(decrypted))
            })
            .catch(error => {
                console.error(error)
                return error
            })
    }
}
