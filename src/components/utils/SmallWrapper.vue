<template>
    <div class="small__wrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SmallWrapper',
}
</script>

<style lang="scss" scoped>
.small__wrapper {
    max-width: 600px;
    height: calc(100vh - 30px);
    margin: 0 auto;
    position: relative;
}
</style>
