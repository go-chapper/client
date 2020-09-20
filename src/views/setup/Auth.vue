<template>
    <div class="setup__auth">
        <small-wrapper>
            <utils-center classes="wrapper">
                <form-header
                    headline="Register a new account or Login"
                    description="If you already have an account on this server, go ahead and login. If you don't have an account you can register one right now!"
                    next="next"
                    prev="prev"
                    @setupPrev="goBack"
                    @setupNext="loginOrRegister"
                ></form-header>
                <form-tabs
                    :tabs="['Login', 'Register']"
                    @setupSwitchTab="switchTab"
                >
                    <template v-slot:tab-0>
                        <form-wrapper>
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
                        </form-wrapper>
                    </template>
                    <template v-slot:tab-1>
                        <form-wrapper>
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
                        </form-wrapper>
                    </template>
                </form-tabs>
            </utils-center>
        </small-wrapper>
    </div>
</template>

<script>
import UtilsCenter from '@/components/utils/UtilsCenter'
import SmallWrapper from '@/components/utils/SmallWrapper'
import FormHeader from '@/components/form/FormHeader'
import FormTabs from '@/components/form/FormTabs'
import FormWrapper from '@/components/form/FormWrapper'

// import AuthModule from '@/modules/auth.module'

export default {
    name: 'SetupServer',
    components: {
        UtilsCenter,
        SmallWrapper,
        FormHeader,
        FormTabs,
        FormWrapper,
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
                    .then(
                        response => {
                            if (response.status == 200) {
                                this.$store.commit('setSetupHomeServer', '')
                                this.$store.commit('setHomeServer', url)
                                return
                            }
                        },
                        error => {
                            console.error(error)
                        }
                    )
            }
        },
    },
}
</script>
