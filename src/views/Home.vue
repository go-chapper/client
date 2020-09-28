<template>
    <div class="home">
        <vertical-navigation>
            <profile-avatar-link></profile-avatar-link>
            <server-list></server-list>
        </vertical-navigation>
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
        return {}
    },
    mounted() {},
}
</script>
