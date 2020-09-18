<template>
    <div class="form__wrapper">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FormWrapper',
}
</script>

<style lang="scss" scoped>
.form__wrapper {
    * {
        margin: 15px 0 0 0;
    }
}
</style>
