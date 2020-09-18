<template>
    <div class="auth__login">
        <small-wrapper>
            <utils-center></utils-center>
        </small-wrapper>
    </div>
</template>

<script>
import SmallWrapper from '@/components/utils/SmallWrapper'
import UtilsCenter from '@/components/utils/UtilsCenter'

export default {
    name: 'Login',
    components: {
        SmallWrapper,
        UtilsCenter,
    },
}
</script>
