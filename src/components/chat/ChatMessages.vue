<template>
    <div class="chat__messages">
        <chat-send-message :message="message"></chat-send-message>
    </div>
</template>

<script>
import ChatSendMessage from './ChatSendMessage'

export default {
    name: 'ChatMessages',
    components: {
        ChatSendMessage,
    },
    props: {
        message: String,
    },
}
</script>

<style lang="scss" scoped>
.chat__messages {
    min-height: 50vh;
}
</style>
