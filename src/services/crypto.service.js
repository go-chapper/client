class CryptoService {
    // import imports a password (ArrayBuffer) as a crypto key. This returns a promise
    import(payload) {
        return window.crypto.subtle.importKey('raw', payload, 'PBKDF2', false, [
            'deriveKey',
        ])
    }

    async export(key) {
        return await window.crypto.subtle.exportKey('raw', key)
    }

    // derive derives a key from a base key and a salt
    derive(key, salt, iterations) {
        if (salt === '') {
            return Promise.reject('Public client-side salt cannot be empty')
        }

        const s = this._stringToArrayBuffer(salt)
        return window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: s,
                iterations: iterations,
                hash: 'SHA-256',
            },
            key,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        )
    }

    // encrypt encrypts the payload with the given PBKDF2 key
    async encrypt(key, payload) {
        const iv = window.crypto.getRandomValues(new Uint8Array(12))
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            this._stringToArrayBuffer(payload)
        )
        return {
            cipherText: this._arrayBufferToBase64String(encrypted),
            iv: iv,
        }
    }

    // digest returns the SHA-256 hash of the payload
    async digest(payload) {
        return await crypto.subtle.digest(
            'SHA-256',
            this._stringToArrayBuffer(payload)
        )
    }

    // hashPassword generates a masterKey and returns masterKeyHash
    async hashPassword(payload, salt) {
        const payloadArrayBuffer = this._stringToArrayBuffer(payload)
        const saltArrayBuffer = this._stringToArrayBuffer(salt)
        return this.pbkdf2(payloadArrayBuffer, saltArrayBuffer, 100000)
            .then(masterKey => {
                return this.pbkdf2(masterKey, payloadArrayBuffer, 1)
            })
            .catch(error => {
                console.error(error)
                return error
            })
    }

    // pbkdf2 returns an exported PBKDF2 passphrase
    async pbkdf2(payload, salt, iterations) {
        return this.import(payload)
            .then(importedKey => {
                return this.derive(importedKey, salt, iterations)
            })
            .then(derivedKey => {
                return this.export(derivedKey)
            })
            .catch(error => {
                console.error(error)
                return error
            })
    }

    // string returns an ArrayBuffer as a Base64 encoded string
    string(buffer) {
        if (buffer instanceof ArrayBuffer) {
            return this._arrayBufferToBase64String(buffer)
        }
        return ''
    }

    // _stringToArrayBuffer converts a string to an array buffer
    _stringToArrayBuffer(str) {
        const buf = new ArrayBuffer(str.length)
        const bufView = new Uint8Array(buf)
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i)
        }
        return buf
    }

    // _arrayBufferToBase64String returns the base64 representation of the array buffer
    _arrayBufferToBase64String(buff) {
        return btoa(
            new Uint8Array(buff).reduce(
                (s, b) => s + String.fromCharCode(b),
                ''
            )
        )
    }
}

export default new CryptoService()
