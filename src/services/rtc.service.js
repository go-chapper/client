class RTC {
    constructor() {
        this.pc = null
        this.host = window.location.hostname
        this.signaling = null
    }

    CreateConnection(signaling) {
        this.signaling = signaling

        this.pc = new RTCPeerConnection({
            iceServers: [
                // Information about ICE servers - Use your own!
                {
                    urls: [
                        `turn:${this.host}:50554`,
                        `stun:${this.host}:50554`,
                    ],
                },
            ],
        })

        this.pc.onicecandidate = this._handleICECandidateEvent
        this.pc.ontrack = this._handleTrackEvent
        this.pc.onnegotiationneeded = this._handleNegotiationNeededEvent
        this.pc.onremovetrack = this._handleRemoveTrackEvent
        this.pc.oniceconnectionstatechange = this._handleICEConnectionStateChangeEvent
        this.pc.onicegatheringstatechange = this._handleICEGatheringStateChangeEvent
        this.pc.onsignalingstatechange = this._handleSignalingStateChangeEvent
    }

    _handleICECandidateEvent() {}

    _handleTrackEvent() {}

    _handleNegotiationNeededEvent() {}
}

export default new RTC()
