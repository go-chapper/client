<template>
    <div class="os__navigation">
        <router-link class="os__navigation--title" to="/">Chapper</router-link>
        <router-link class="os__navigation--title" to="/setup/welcome"
            >Code</router-link
        >
        <router-link class="os__navigation--title" to="/auth/login"
            >Login</router-link
        >
        <minimize-button></minimize-button>
        <toggle-button></toggle-button>
        <close-button></close-button>
    </div>
</template>

<script>
import MinimizeButton from '@/components/os/MinimizeButton'
import ToggleButton from '@/components/os/ToggleButton'
import CloseButton from '@/components/os/CloseButton'

export default {
    name: 'Navigation',
    components: {
        CloseButton,
        ToggleButton,
        MinimizeButton,
    },
}
</script>

<style lang="scss" scoped>
.os__navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 100px auto 40px 40px 40px;
    grid-template-rows: 30px;
    background-color: $primaryBG;
    border-bottom: 1px solid $secondaryDarkGrey;
    z-index: 20;
    -webkit-app-region: drag;

    &--title {
        color: $secondaryLightGrey;
        line-height: 30px;
        font-weight: 700;
        font-size: 1.3rem;
        margin: 0 0 0 5px;
        user-select: none;
        -webkit-app-region: no-drag;
    }
}
</style>
