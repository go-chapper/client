<template>
    <div class="navigation__vertical">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VerticalNavigation',
}
</script>

<style lang="scss" scoped>
.navigation__vertical {
    position: fixed;
    left: 0;
    top: 30px;
    width: 51px;
    height: calc(100vh - 30px);
    padding: 15px 5px 0;
    border-right: 1px solid #22222b;
}
</style>
