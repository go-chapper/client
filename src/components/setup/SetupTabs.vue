<template>
    <div class="setup__tabs">
        <div
            class="tab"
            v-for="(tab, i) in tabs"
            :key="i"
            :id="'tab-' + i"
            :class="{ active: active == i ? true : false }"
            @click="selectTab"
        >
            <h3>{{ tab }}</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SetupTabs',
    props: {
        tabs: Array,
    },
    data() {
        return {
            active: 0,
        }
    },
    methods: {
        selectTab(e) {
            this.active = e.target.id.replace('tab-', '')
            this.$emit('setupSwitchTab', this.active)
        },
    },
}
</script>

<style lang="scss" scoped>
.setup__tabs {
    display: flex;
    justify-content: space-between;

    .tab {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid $secondaryDarkGrey;
        cursor: pointer;

        &.active {
            border-bottom: 1px solid $primaryAccent;
            cursor: default;
        }

        h3 {
            text-align: center;
            color: $primaryWhite;
            font-size: 1.6rem;
            pointer-events: none;
        }
    }
}
</style>
