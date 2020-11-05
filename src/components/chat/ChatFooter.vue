<template>
    <div class="chat__footer">
        <input type="text" v-model="message" placeholder="Write a message..." />
        <secondary-square-button @click.native="send">
            <chevron-right></chevron-right>
        </secondary-square-button>
    </div>
</template>

<script>
import SecondarySquareButton from '@/components/buttons/SecondarySquareButton'
import ChevronRight from '@/components/icons/chevron/ChevronRightIcon'

export default {
    name: 'ChatFooter',
    data() {
        return {
            message: '',
        }
    },
    components: {
        SecondarySquareButton,
        ChevronRight,
    },
    methods: {
        send() {
            this.$emit('chat-send-message', this.message)
            this.message = ''
        },
    },
}
</script>
