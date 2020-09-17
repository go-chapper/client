<template>
    <div class="os__navigation--maximize-minimize" v-on:click="toggle">
        <minimize-icon></minimize-icon>
    </div>
</template>

<script>
import MinimizeIcon from '@/components/icons/basic/MinimizeIcon'

export default {
    name: 'ToggleButton',
    components: {
        MinimizeIcon,
    },
    methods: {
        toggle() {
            window.ipcRenderer.send('vue-minimize-app')
        },
    },
}
</script>

<style lang="scss" scoped>
.os__navigation--maximize-minimize {
    color: #a7a7a7;
    grid-column-start: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-app-region: no-drag;

    &:hover {
        color: #f5f5f5;
        background-color: #222429;
    }
}
</style>
