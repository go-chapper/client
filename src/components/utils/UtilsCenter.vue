<template>
    <div class="utils__center" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'UtilsCenter',
    props: {
        classes: String,
    },
}
</script>

<style lang="scss" scoped>
.utils__center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    &.wrapper {
        padding: 15px;
        background-color: $primaryDarkBlue;
        border-radius: 5px;
    }
}
</style>
