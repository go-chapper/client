<template>
    <div class="entry"></div>
</template>

<script>
export default {
    name: 'Home',
    data: () => {
        return {}
    },
    mounted() {
        const homeServer = this.$store.getters.getHomeServer
        if (homeServer == '') {
            this.$router.push('setup/welcome')
            return
        }

        const jwt = this.$store.getters['auth/getJwt']
        if (jwt == '') {
            this.$router.push('auth/login')
            return
        }

        this.$router.push('/home')
    },
}
</script>
