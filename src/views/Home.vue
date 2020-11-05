<template>
    <div class="home">
        <vertical-navigation>
            <profile-avatar-link></profile-avatar-link>
            <server-list></server-list>
        </vertical-navigation>
        <chat></chat>
    </div>
</template>

<script>
import VerticalNavigation from '@/components/navigation/VerticalNavigation'
import ProfileAvatarLink from '@/components/profile/ProfileAvatarLink'
import ServerList from '@/components/server/ServerList'
import Chat from '@/components/chat/Chat'

export default {
    name: 'Home',
    components: {
        VerticalNavigation,
        ProfileAvatarLink,
        ServerList,
        Chat,
    },
}
</script>

<style lang="scss" scoped>
.home {
    padding: 0 100px;
}
</style>
