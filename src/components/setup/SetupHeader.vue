<template>
    <div class="setup__header" :class="{ both: prev }">
        <h2>{{ headline }}</h2>
        <secondary-square-button
            v-if="prev"
            class="prev"
            @click.native="setupPrev"
        >
            <chevron-left></chevron-left>
        </secondary-square-button>
        <secondary-square-button
            v-if="next"
            class="next"
            @click.native="setupNext"
        >
            <chevron-right></chevron-right>
        </secondary-square-button>
        <p v-if="description">{{ description }}</p>
    </div>
</template>

<script>
import ChevronRight from '@/components/icons/chevron/ChevronRightIcon'
import ChevronLeft from '@/components/icons/chevron/ChevronLeftIcon'
import SecondarySquareButton from '@/components/buttons/SecondarySquareButton'

export default {
    name: 'SetupHeader',
    props: {
        next: String,
        prev: String,
        headline: String,
        description: String,
    },
    components: {
        ChevronRight,
        ChevronLeft,
        SecondarySquareButton,
    },
    methods: {
        setupNext() {
            this.$emit('setupNext')
        },
        setupPrev() {
            this.$emit('setupPrev')
        },
    },
}
</script>

<style lang="scss" scoped>
.setup__header {
    width: 100%;
    padding: 0 0 15px 0;
    border-bottom: 1px solid $secondaryDarkGrey;
    display: grid;
    grid-template-columns: 75% auto 30px 30px;
    grid-template-rows: 30px auto;

    h2 {
        color: $primaryWhite;
        font-size: 2rem;
        grid-column-start: 1;
    }

    div {
        &.prev {
            grid-column-start: 3;
        }

        &.next {
            grid-column-start: 4;
        }
    }

    &.both {
        div:first-of-type {
            border: 1px solid $secondaryDarkGrey;
            border-radius: 5px 0 0 5px;
        }

        div:last-of-type {
            border-width: 1px 1px 1px 0px;
            border-radius: 0px 5px 5px 0px;
        }
    }

    p {
        width: 100%;
        grid-column: 1 / 3;
        grid-row-start: 2;
        font-size: 1.3rem;
        color: $primaryWhite;
        margin: 15px 0 0 0;
        line-height: 1.5;
    }
}
</style>
