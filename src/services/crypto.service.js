class CryptoService {
    // import imports a password (string) as a crypto key. This returns a promise
    import(password) {
        const buff = this._stringToArrayBuffer(password)
        return window.crypto.subtle.importKey('raw', buff, 'PBKDF2', false, [
            'deriveKey',
        ])
    }

    async export(key) {
        return await window.crypto.subtle.exportKey('raw', key)
    }

    // derive derives a key from a base key and a salt
    derive(key, salt) {
        if (salt.byteLength === 0) {
            return Promise.reject('Public client-side salt cannot be empty')
        }
        return window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
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

    // hashPassword hashes (salt || username || password)
    async hashPassword(username, password, salt) {
        if (salt === '') {
            return Promise.reject('Public client-side salt cannot be empty')
        }

        const s = this._stringToArrayBuffer(salt)
        return await this.import(password)
            .then(key => {
                return this.derive(key, s)
            })
            .then(pbkdf => {
                return this.export(pbkdf)
            })
            .then(exp => {
                const expString = this._arrayBufferToBase64String(exp)
                return this.digest(salt + username + expString)
            })
            .then(dig => {
                return this._arrayBufferToBase64String(dig)
            })
            .catch(error => {
                console.error(error)
                return ''
            })
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
