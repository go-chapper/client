import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import DirectText from './modules/direct-text'

Vue.config.productionTip = false

Vue.use({
    install(Vue) {
        Vue.prototype.$axios = axios
        Vue.prototype.$directText = new DirectText({})
    },
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
