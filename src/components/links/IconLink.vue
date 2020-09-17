<template>
    <router-link :class="classes" :to="to">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: 'IconLink',
    props: {
        to: String,
        classes: String,
    },
}
</script>
