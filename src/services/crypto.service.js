const PUBLIC_PEM_HEADER = '-----BEGIN PUBLIC KEY-----'
const PUBLIC_PEM_FOOTER = '-----END PUBLIC KEY-----'
const PRIVATE_PEM_HEADER = '-----BEGIN PRIVATE KEY-----'
const PRIVATE_PEM_FOOTER = '-----END PRIVATE KEY-----'

class CryptoService {
    // import imports a password (ArrayBuffer) as a crypto key. This returns a promise
    import(payload) {
        return window.crypto.subtle.importKey('raw', payload, 'PBKDF2', false, [
            'deriveKey',
        ])
    }

    async importSPKI(key) {
        const keyContents = key.substring(
            PUBLIC_PEM_HEADER.length,
            key.length - PUBLIC_PEM_FOOTER.length
        )
        const binaryString = window.atob(keyContents)
        const binaryBuffer = this.str2ab(binaryString)

        return window.crypto.subtle.importKey(
            'spki',
            binaryBuffer,
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
        const exported_binary_string = this.ab2str(exported)
        const exported_base64_string = window.btoa(exported_binary_string)
        return `${PRIVATE_PEM_HEADER}${exported_base64_string}${PRIVATE_PEM_FOOTER}`
    }

    // exportSPKI exports public keys in SPKI format
    async exportSPKI(key) {
        const exported = await window.crypto.subtle.exportKey('spki', key)
        const exported_binary_string = this.ab2str(exported)
        const exported_base64_string = window.btoa(exported_binary_string)
        return `${PUBLIC_PEM_HEADER}${exported_base64_string}${PUBLIC_PEM_FOOTER}`
    }

    // derive derives a key from a base key and a salt
    derive(key, salt, iterations) {
        if (salt === '') {
            return Promise.reject('Public client-side salt cannot be empty')
        }

        const s = this.str2ab(salt)
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
            .then(imported_key => {
                return this.derive(imported_key, salt, iterations)
            })
            .then(derived_key => {
                return this.exportRaw(derived_key)
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
        const payload_buffer = this.str2ab(payload)
        const salt_buffer = this.str2ab(salt)
        return this.pbkdf2(payload_buffer, salt_buffer, 100000)
            .then(master_key => {
                return this.pbkdf2(master_key, payload_buffer, 1)
            })
            .catch(error => {
                console.error(error)
                return error
            })
    }

    // encryptWithPublickey encrypts the payload with the provided publicKey
    encryptWithPublickey(public_key, payload) {
        return window.crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP',
            },
            public_key,
            payload
        )
    }

    decryptWithPrivateKey(private_key, ciphertext) {
        return window.crypto.subtle.decrypt(
            {
                name: 'RSA-OAEP',
            },
            private_key,
            ciphertext
        )
    }

    encode(str) {
        const enc = new TextEncoder()
        return enc.encode(str)
    }

    decode(buf) {
        const dec = new TextDecoder()
        return dec.decode(buf)
    }

    ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf))
    }

    str2ab(str) {
        const buf = new ArrayBuffer(str.length)
        const bufView = new Uint8Array(buf)
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i)
        }
        return buf
    }
}

export default new CryptoService()
