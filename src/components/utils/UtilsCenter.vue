<template>
    <div class="utils__center">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'UtilsCenter',
}
</script>

<style lang="scss" scoped>
.utils__center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}
</style>
