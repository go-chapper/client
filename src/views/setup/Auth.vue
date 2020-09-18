<template>
    <div class="setup__auth">
        <small-wrapper>
            <utils-center>
                <setup-header
                    headline="Register a new account or Login"
                    description="If you already have an account on this server, go ahead and login. If you don't have an account you can register one right now!"
                    next="next"
                    prev="prev"
                    @setupPrev="goBack"
                    @setupNext="loginOrRegister"
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
                            v-model="registerUsername"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            spellcheck="false"
                            v-model="registerPassword"
                        />
                        <input
                            type="text"
                            placeholder="Email address (optional)"
                            spellcheck="false"
                            v-model="registerEmail"
                        />
                    </div>
                </div>
            </utils-center>
        </small-wrapper>
    </div>
</template>

<script>
import UtilsCenter from '@/components/utils/UtilsCenter'
import SmallWrapper from '@/components/utils/SmallWrapper'
import SetupHeader from '@/components/setup/SetupHeader'
import SetupTabs from '@/components/setup/SetupTabs'

// import AuthModule from '@/modules/auth.module'

export default {
    name: 'SetupServer',
    components: {
        UtilsCenter,
        SmallWrapper,
        SetupHeader,
        SetupTabs,
    },
    data() {
        return {
            username: '',
            password: '',
            registerUsername: '',
            registerPassword: '',
            registerEmail: '',
            registerUsernameInvalid: false,
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
        loginOrRegister() {
            let url = this.$store.getters.getSetupHomeServer

            if (this.active == 0) {
                const { username, password } = this
                this.$store
                    .dispatch('auth/login', { username, password })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.commit('setSetupHomeServer', '')
                            this.$store.commit('setHomeServer', url)
                            this.$router.push('/')
                            return
                        }
                    })
            } else {
                const {
                    registerUsername,
                    registerPassword,
                    registerEmail,
                } = this
                this.$store
                    .dispatch('auth/register', {
                        registerUsername,
                        registerPassword,
                        registerEmail,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.commit('setSetupHomeServer', '')
                            this.$store.commit('setHomeServer', url)
                            return
                        }
                    })
            }
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
