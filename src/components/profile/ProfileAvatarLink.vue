<template>
    <router-link to="/profile">
        <profile-avatar :username="username" v-if="username"></profile-avatar>
    </router-link>
</template>

<script>
import ProfileAvatar from '@/components/profile/ProfileAvatar'

export default {
    name: 'ProfileAvatarLink',
    components: {
        ProfileAvatar,
    },
    data() {
        return {
            username: '',
        }
    },
    mounted() {
        const claims = this.$store.getters['auth/getClaims']
        console.log(claims)
        this.username = claims.username
    },
}
</script>

<style lang="scss" scoped>
a {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 50%;
    overflow: hidden;

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
