class DirectText {
    constructor() {
        this.pc = null
        this.signaling = null
    }

    New(from, to, signaling) {
        this.signaling = signaling
        console.log(from, to)
    }
}

export default new DirectText()
