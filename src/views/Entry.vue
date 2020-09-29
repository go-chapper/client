<template>
    <div class="entry"></div>
</template>

<script>
export default {
    name: 'Entry',
    data: () => {
        return {}
    },
    mounted() {
        console.log('Entry')
        const homeServer = this.$store.getters.getHomeServer
        console.log(homeServer)
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
