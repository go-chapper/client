<template>
    <div class="setup__server">
        <small-wrapper>
            <utils-center>
                <form-header
                    headline="Configure home server"
                    description="The home server is the server you will connect to and which will save your account data - encypted of course!"
                    next="next"
                    @setupNext="checkURL"
                ></form-header>
                <div class="input__icon">
                    <input
                        type="text"
                        placeholder="Server address"
                        spellcheck="false"
                        v-model="homeServerAddress"
                        :class="{ invalid: isInvalid }"
                        @input="onInput"
                    />
                    <div class="icon error" :class="{ visible: isInvalid }">
                        <issue-icon></issue-icon>
                    </div>
                </div>
            </utils-center>
        </small-wrapper>
    </div>
</template>

<script>
import UtilsCenter from '@/components/utils/UtilsCenter'
import FormHeader from '@/components/form/FormHeader'
import SmallWrapper from '@/components/utils/SmallWrapper'
import IssueIcon from '@/components/icons/basic/IssueIcon'

export default {
    name: 'SetupServer',
    components: {
        UtilsCenter,
        FormHeader,
        SmallWrapper,
        IssueIcon,
    },
    data: () => {
        return {
            setupHomeServer: '',
            homeServerAddress: '',
            isInvalid: false,
        }
    },
    methods: {
        async checkURL() {
            if (this.homeServerAddress == '') {
                this.isInvalid = true
                return
            }

            // Parse the URL
            let parsedURL = ''
            try {
                parsedURL = new URL(this.homeServerAddress)
            } catch (error) {
                this.isInvalid = true
            }

            // Check if the adress uses https
            // if (parsedURL.protocol != 'https:') {
            //     this.isInvalid = true
            //     return
            // }

            // If we visited this step already and didnt change the adress continue
            // without connection check
            if (
                this.setupHomeServer != '' &&
                this.setupHomeServer == this.homeServerAddress
            ) {
                this.$router.push('/setup/auth')
                return
            }

            // Chacek connection
            const reachable = await this.checkConnection(parsedURL)
            if (!reachable) {
                this.isInvalid = true
                return
            }

            this.$store.commit('setSetupHomeServer', parsedURL.toString())
            this.$router.push('/setup/auth')
        },
        onInput() {
            if (!this.isInvalid) {
                return
            }
            this.isInvalid = false
        },
        checkConnection(url) {
            return this.$axios.get(url.toString() + 'et').then(
                res => {
                    if (res.data == url.hostname) {
                        return true
                    }
                    return false
                },
                () => {
                    return false
                }
            )
        },
    },
    mounted() {
        this.setupHomeServer = this.$store.getters.getSetupHomeServer
        if (this.setupHomeServer != '') {
            this.homeServerAddress = this.setupHomeServer
        }
    },
}
</script>

<style lang="scss" scoped>
.input__icon {
    margin: 15px 0 0 0;
}
</style>
