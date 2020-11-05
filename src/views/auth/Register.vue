<template>
    <div class="auth__register">
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
                    <input
                        type="email"
                        placeholder="E-Mail"
                        spellcheck="false"
                        v-model="email"
                    />
                    <secondary-icon-button @click.native="register">
                        <span>Register</span>
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
    name: 'Register',
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
            email: '',
        }
    },
    computed: {
        homeServer() {
            return this.$store.getters.getHomeServerHost
        },
    },
    mounted() {
        // this.$store.dispatch('auth/reset')
    },
    methods: {
        register() {
            const { username, password, email } = this
            this.$store
                .dispatch('keys/generateKeypair')
                .then(publicKey => {
                    return this.$store.dispatch('auth/register', {
                        username,
                        password,
                        email,
                        publicKey,
                    })
                })
                .then(response => {
                    if (response.status == 200) {
                        this.$router.push('/auth/login')
                        return
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        },
    },
}
</script>
