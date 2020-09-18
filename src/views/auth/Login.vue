<template>
    <div class="auth__login">
        <small-wrapper>
            <utils-center>
                <form-header
                    headline="Login"
                    :description="`You are connected to ${homeServer}`"
                ></form-header>
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
                    <secondary-icon-button @click.native="login">
                        <span>Login</span>
                        <arrow-right-icon></arrow-right-icon>
                    </secondary-icon-button>
                </form-wrapper>
            </utils-center>
        </small-wrapper>
    </div>
</template>

<script>
import SmallWrapper from '@/components/utils/SmallWrapper'
import UtilsCenter from '@/components/utils/UtilsCenter'
import FormHeader from '@/components/form/FormHeader'
import FormWrapper from '@/components/form/FormWrapper'
import SecondaryIconButton from '@/components/buttons/SecondaryIconButton'
import ArrowRightIcon from '@/components/icons/arrows/ArrowRightIcon'

export default {
    name: 'Login',
    components: {
        SmallWrapper,
        UtilsCenter,
        FormHeader,
        FormWrapper,
        SecondaryIconButton,
        ArrowRightIcon,
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    computed: {
        homeServer() {
            return this.$store.getters.getHomeServerHost
        },
    },
    methods: {
        login() {
            const { username, password } = this
            if (username == '' || password == '') {
                // TODO <2020/18/09>: Add error message in app
                throw 'Username and/or password empty'
            }

            this.$store
                .dispatch('auth/login', { username, password })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.action == 'login') {
                            this.$router.push('/')
                            return
                        }
                        this.$router.push('/auth/code')
                    }
                })
                .catch(error => {
                    // TODO <2020/18/09>: Add error message in app
                    console.error(error)
                })
        },
    },
}
</script>
