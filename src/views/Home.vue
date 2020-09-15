<template>
    <div class="home">
        <!-- Browser base64 Session Description
        <textarea id="localSessionDescription" readonly="true"></textarea>
        <br />
        Golang base64 Session Description:
        <textarea id="remoteSessionDescription"></textarea> <br />
        <button onclick="window.startSession()">Start Session</button> <br />
        <br />

        Message:
        <textarea id="message">This is my DataChannel message!</textarea> <br />
        <button onclick="window.sendMessage()">Send Message</button> <br /> -->
        <!-- <input type="text" v-model="username" placeholder="Username" /> <br />
        <input type="text" v-model="token" placeholder="Token" /> <br />
        <button v-on:click="openWS">Open WS</button>
        <button v-on:click="openPC">Open PC</button><br /> -->
        <input type="text" v-model="username" placeholder="Username" /> <br />
        <input type="text" v-model="jwt" placeholder="JWT" /> <br />
        <button v-on:click="openWS">Open WS</button> <br />

        <input type="text" v-model="to" placeholder="To" /> <br />
        <button v-on:click="sendOffer">Send new chat offer</button>

        <div id="logs"></div>
    </div>
</template>

<script>
import signaling from '@/services/signaling.service.js'
import rtc from '@/services/signaling.service.js'

export default {
    name: 'Home',
    data: () => {
        return {
            signaling: null,
            jwt: '',
            username: '',
            token: '',
            topic: '',
            from: '',
            to: '',
            pc: null,
            sd: '',
        }
    },
    mounted() {},
    methods: {
        openWS() {
            this.signaling = signaling.Connect(this.username, this.jwt)
            this.signaling.OnMessage(e => {
                console.log(e)
            })
        },
        sendOffer() {
            this.signaling.SendChatOffer(this.to)
        },
        openPC() {
            this.pc = rtc.CreateConnection(this.signaling)
        },
    },
}
</script>
