<template>
    <div id="app">
        <navigation></navigation>
        <router-view />
    </div>
</template>

<script>
import Navigation from '@/components/os/Navigation.vue'
export default {
    name: 'App',
    components: {
        Navigation,
    },
}
</script>

<style lang="scss">
html,
body {
    width: 100%;
    height: auto;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-edge: cap alphabetic;
    leading-trim: both;
    font-size: 10px;
    font-family: 'Ubuntu';
    user-select: none;
}

a {
    text-decoration: none;
}

#app {
    height: calc(100vh - 30px);
    margin: 30px 0 0 0;
}
</style>
