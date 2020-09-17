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
        let homeServer = this.$store.getters.getHomeServer
        if (homeServer == '') {
            this.$router.push('setup/welcome')
        }
    },
}
</script>
