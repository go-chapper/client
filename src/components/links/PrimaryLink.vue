<template>
    <router-link class="btn btn__primary" :class="classes" :to="to">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: 'PrimaryLink',
    props: {
        to: String,
        classes: String,
    },
}
</script>
