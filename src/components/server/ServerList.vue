<template>
    <div class="server__list" v-if="loaded">
        <div class="server__list--item" v-for="(s, i) in servers" :key="i">
            {{ s.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ServerList',
    data() {
        return {
            servers: [],
            loaded: false,
        }
    },
    mounted() {
        this.$store
            .dispatch('servers/getUserServers', true)
            .then(servers => {
                this.servers = servers
                this.loaded = true
            })
            .catch(error => {
                console.error(error)
            })
    },
}
</script>

<style lang="scss" scoped>
.server__list--item {
    color: $primaryWhite;
}
</style>
