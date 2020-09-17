<template>
    <div class="setup__auth">
        <setup-wrapper>
            <utils-center>
                <setup-header
                    headline="Register a new account or Login"
                    description="If you already have an account on this server, go ahead and login. If you don't have an account you can register one right now!"
                    next="next"
                    prev="prev"
                    @setupPrev="goBack"
                ></setup-header>
                <setup-tabs
                    :tabs="['Login', 'Register']"
                    @setupSwitchTab="switchTab"
                ></setup-tabs>
                <div class="setup__tab__contents">
                    <div
                        class="tab__content"
                        :class="{ active: active == 0 }"
                        id="content-0"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            spellcheck="false"
                            v-model="username"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            spellcheck="false"
                            v-model="password"
                        />
                    </div>
                    <div
                        class="tab__content"
                        :class="{ active: active == 1 }"
                        id="content-1"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            spellcheck="false"
                            v-model="username"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            spellcheck="false"
                            v-model="password"
                        />
                        <input
                            type="text"
                            placeholder="Email address (optional)"
                            spellcheck="false"
                            v-model="email"
                        />
                    </div>
                </div>
            </utils-center>
        </setup-wrapper>
    </div>
</template>

<script>
import UtilsCenter from '@/components/utils/UtilsCenter'
import SetupWrapper from '@/components/setup/SetupWrapper'
import SetupHeader from '@/components/setup/SetupHeader'
import SetupTabs from '@/components/setup/SetupTabs'

export default {
    name: 'SetupServer',
    components: {
        UtilsCenter,
        SetupWrapper,
        SetupHeader,
        SetupTabs,
    },
    data() {
        return {
            username: '',
            password: '',
            email: '',
            active: 0,
        }
    },
    methods: {
        goBack() {
            this.$router.push('/setup/server')
        },
        switchTab(e) {
            this.active = e
        },
    },
}
</script>

<style lang="scss" scoped>
.setup__tab__contents {
    position: relative;
    height: 110px;

    .tab__content {
        width: 100%;
        display: none;

        &.active {
            display: block;
        }

        input {
            margin: 15px 0 0 0;
        }
    }
}
</style>
