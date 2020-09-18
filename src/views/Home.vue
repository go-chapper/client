<template>
    <div class="home"></div>
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

        const parts = jwt.split('.')
        const claims = JSON.parse(atob(parts[1]))
        console.log(claims)
    },
}
</script>
