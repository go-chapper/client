<template>
    <div class="chat">
        <chat-header></chat-header>
        <chat-messages :message="message"></chat-messages>
        <chat-footer @chat-send-message="onChatSendMessage"></chat-footer>
    </div>
</template>

<script>
import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter'
import ChatMessages from './ChatMessages'

export default {
    name: 'Chat',
    components: {
        ChatHeader,
        ChatFooter,
        ChatMessages,
    },
    data() {
        return {
            message: '',
        }
    },
    methods: {
        onChatSendMessage(message) {
            this.$directText
                .sendMessage({
                    type: 'message-text',
                    to: ['Test'],
                    from: 'Techassi',
                    data: message,
                })
                .catch(error => {
                    console.error(error)
                })
        },
        decryptedMessage(message) {
            console.log(message)
        },
    },
    mounted() {
        this.$directText
            .connect()
            .then(() => {
                this.$directText.onMessage(msg => {
                    console.log(msg)
                    this.message = msg
                })
            })
            .catch(error => {
                console.error(error)
            })
    },
    beforeDestroy() {
        this.$directText.disconnect()
    },
}
</script>
