export default class RTC {
    constructor(host) {
        this.pc = null
        this.host = host
        this.signaling = null
    }

    CreateConnection(signaling) {
        this.signaling = signaling

        this.pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                        `turn:${this.host}:12345`,
                        `stun:${this.host}:12345`,
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

    _handleRemoveTrackEvent() {}

    _handleICEConnectionStateChangeEvent() {}

    _handleICEGatheringStateChangeEvent() {}

    _handleSignalingStateChangeEvent() {}
}
