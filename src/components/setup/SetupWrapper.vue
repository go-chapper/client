<template>
    <div class="setup__wrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SetupWrapper',
}
</script>

<style lang="scss" scoped>
.setup__wrapper {
    max-width: 600px;
    height: calc(100vh - 30px);
    margin: 0 auto;
    position: relative;
}
</style>
