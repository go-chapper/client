<template>
    <div class="os__navigation--close" v-on:click="close">
        <close-icon></close-icon>
    </div>
</template>

<script>
import CloseIcon from '@/components/icons/basic/CloseIcon.vue'

export default {
    name: 'CloseButton',
    components: {
        CloseIcon,
    },
    methods: {
        close() {
            window.ipcRenderer.send('vue-close-app')
        },
    },
}
</script>

<style lang="scss" scoped>
.os__navigation--close {
    color: #a7a7a7;
    grid-column-start: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: no-drag;

    &:hover {
        color: #f5f5f5;
        background-color: $osCloseRed;
    }
}
</style>
