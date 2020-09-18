<template>
    <router-link class="btn btn__secondary" :class="classes" :to="to">
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
