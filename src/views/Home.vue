<template>
    <div class="home">
        <vertical-navigation>
            <profile-avatar-link></profile-avatar-link>
        </vertical-navigation>
    </div>
</template>

<script>
import VerticalNavigation from '@/components/navigation/VerticalNavigation'
import ProfileAvatarLink from '@/components/profile/ProfileAvatarLink'

export default {
    name: 'Home',
    components: {
        VerticalNavigation,
        ProfileAvatarLink,
    },
    data: () => {
        return {}
    },
    mounted() {},
}
</script>
