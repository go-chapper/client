<template>
    <img
        :src="`${homeServer}avatar/240/${username}`"
        :alt="`Avatar picture of ${username}`"
    />
</template>

<script>
export default {
    name: 'ProfileAvatar',
    props: {
        username: String,
    },
    computed: {
        homeServer() {
            return this.$store.getters.getHomeServer
        },
    },
}
</script>
