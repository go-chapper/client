<template>
    <div class="auth__code">
        <small-wrapper>
            <utils-center>
                <form-header headline="Two-factor Authentication"></form-header>
                <form-wrapper>
                    <input
                        type="text"
                        placeholder="Authentication Code"
                        spellcheck="false"
                        v-model="code"
                    />
                    <secondary-icon-button @click.native="verify">
                        <span>Verify</span>
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
    name: 'AuthCode',
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
            code: '',
        }
    },
    methods: {
        verify() {
            console.log(this.code)
        },
    },
}
</script>
