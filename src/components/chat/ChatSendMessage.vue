<template>
    <div class="chat__message--send">
        <div class="bubble">
            <span class="bubble__text">{{ message }}</span>
            <span class="bubble__time"></span>
            <div class="bubble__ticks"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatSendMessage',
    props: {
        message: String,
    },
}
</script>

<style lang="scss" scoped>
.chat__message--send {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .bubble {
        position: relative;
        display: flex;
        max-width: 70%;
        min-width: 40%;

        padding: 5px;
        background-color: $secondaryDarkGrey;

        &__text {
        }

        &__time {
            position: absolute;
        }
    }
}
</style>
