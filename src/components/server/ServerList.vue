<template>
    <div class="server__list">
        <div v-if="loaded">
            <div class="server__list--item" v-for="(s, i) in servers" :key="i">
                {{ s }}
            </div>
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
            .dispatch('servers/getAll', true)
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
