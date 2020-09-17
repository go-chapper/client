<template>
    <router-link :class="classes" :to="to">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: 'SecondaryLink',
    props: {
        to: String,
        classes: String,
    },
}
</script>

<style lang="scss" scoped>
a {
    background-color: $primaryDarkBlue;
    color: $primaryWhite;
    border: 1px solid $secondaryDarkGrey;
    border-radius: 5px;
    margin: 0;
    padding: 10px 15px;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s;
}
</style>
