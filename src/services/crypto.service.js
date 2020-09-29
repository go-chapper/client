const publicPEMHeader = '-----BEGIN PUBLIC KEY-----'
const publicPEMFooter = '-----END PUBLIC KEY-----'

class CryptoService {
    // import imports a password (ArrayBuffer) as a crypto key. This returns a promise
    import(payload) {
        return window.crypto.subtle.importKey('raw', payload, 'PBKDF2', false, [
            'deriveKey',
        ])
    }

    async importSPKI(key) {
        const keyContents = key.substring(
            publicPEMHeader.length,
            key.length - publicPEMFooter.length
        )
        const keyContentsBuffer = this._stringToArrayBuffer(atob(keyContents))

        return await window.crypto.subtle.importKey(
            'spki',
            keyContentsBuffer,
            {
                name: 'RSA-OAEP',
                hash: 'SHA-256',
            },
            true,
            ['encrypt']
        )
    }

    // exportRaw exports any given key in raw format
    async exportRaw(key) {
        return await window.crypto.subtle.exportKey('raw', key)
    }

    // exportPKCS exports private keys in PKCS#8 format
    async exportPKCS(key) {
        const exported = await window.crypto.subtle.exportKey('pkcs8', key)
        const exportedString = this._arrayBufferToBase64String(exported)
        return `-----BEGIN PRIVATE KEY-----\n${exportedString}\n-----END PRIVATE KEY-----`
    }

    // exportSPKI exports public keys in SPKI format
    async exportSPKI(key) {
        const exported = await window.crypto.subtle.exportKey('spki', key)
        const exportedString = this._arrayBufferToBase64String(exported)
        return `${publicPEMHeader}${exportedString}${publicPEMFooter}`
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

    // pbkdf2 returns an exported PBKDF2 passphrase
    async pbkdf2(payload, salt, iterations) {
        return this.import(payload)
            .then(importedKey => {
                return this.derive(importedKey, salt, iterations)
            })
            .then(derivedKey => {
                return this.exportRaw(derivedKey)
            })
            .catch(error => {
                console.error(error)
                return error
            })
    }

    // generateKeypair generates a RSA keypair consisting of a private and public key
    async generateKeypair() {
        return window.crypto.subtle.generateKey(
            {
                name: 'RSA-OAEP',
                modulusLength: 4048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: 'SHA-256',
            },
            false,
            ['encrypt', 'decrypt']
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

    // encryptWithPublickey encrypts the payload with the provided publicKey
    encryptWithPublickey(payload, publicKey) {
        return window.crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP',
            },
            publicKey,
            payload
        )
    }

    decryptWithPrivateKey(ciphertext, privateKey) {
        return window.crypto.subtle.decrypt(
            {
                name: 'RSA-OAEP',
            },
            privateKey,
            ciphertext
        )
    }

    // string returns an ArrayBuffer as a Base64 encoded string
    string(buffer) {
        if (buffer instanceof ArrayBuffer) {
            return this._arrayBufferToBase64String(buffer)
        }
        return ''
    }

    // buffer returns string as an ArrayBuffer
    buffer(s) {
        if (typeof s == 'string') {
            return this._stringToArrayBuffer(s)
        }
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
