<template>
    <div class="home">
        <vertical-navigation>
            <profile-avatar-link></profile-avatar-link>
            <server-list></server-list>
        </vertical-navigation>
        <input type="text" v-model="message" />
        <button @click="send">Send</button>
    </div>
</template>

<script>
import VerticalNavigation from '@/components/navigation/VerticalNavigation'
import ProfileAvatarLink from '@/components/profile/ProfileAvatarLink'
import ServerList from '@/components/server/ServerList'

export default {
    name: 'Home',
    components: {
        VerticalNavigation,
        ProfileAvatarLink,
        ServerList,
    },
    data: () => {
        return {
            message: '',
        }
    },
    methods: {
        send() {
            this.$directText
                .sendMessage({
                    type: 'message-text',
                    to: ['Techassi'],
                    from: 'Techassi',
                    data: this.message,
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

<style lang="scss" scoped>
.home {
    padding: 0 100px;
}
</style>
