<template>
    <div class="os__navigation--maximize-minimize" v-on:click="toggle">
        <restore-icon></restore-icon>
    </div>
</template>

<script>
import RestoreIcon from '@/components/icons/basic/RestoreIcon'

export default {
    name: 'ToggleButton',
    components: {
        RestoreIcon,
    },
    methods: {
        toggle() {
            window.ipcRenderer.send('vue-toggle-app')
        },
    },
}
</script>

<style lang="scss" scoped>
.os__navigation--maximize-minimize {
    color: #a7a7a7;
    grid-column-start: 4;
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
