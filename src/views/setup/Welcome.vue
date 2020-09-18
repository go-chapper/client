<template>
    <div class="setup__welcome">
        <small-wrapper>
            <utils-center>
                <h1>Welcome to Chapper</h1>
                <!-- <router-link class="next" to="/setup/server"
                    >Continue<svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9 13.887l5-5V8.18l-5-5-.707.707 4.146 4.147H2v1h10.44L8.292 13.18l.707.707z"
                        /></svg
                ></router-link> -->
                <secondary-link to="/setup/server">
                    <span>Continue</span>
                    <arrow-right-icon></arrow-right-icon>
                </secondary-link>
            </utils-center>
        </small-wrapper>
    </div>
</template>

<script>
import UtilsCenter from '@/components/utils/UtilsCenter'
import SmallWrapper from '@/components/utils/SmallWrapper'
import SecondaryLink from '@/components/links/SecondaryLink'
import ArrowRightIcon from '@/components/icons/arrows/ArrowRightIcon'

export default {
    name: 'SetupWelcome',
    components: {
        UtilsCenter,
        SmallWrapper,
        SecondaryLink,
        ArrowRightIcon,
    },
}
</script>

<style lang="scss" scoped>
.setup__welcome {
    h1 {
        color: $primaryWhite;
        font-size: 3rem;
        width: 100%;
        text-align: center;
    }

    a {
        margin: 15px 0 0 0;
    }
}

.setup__welcome ::v-deep .utils__center {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
