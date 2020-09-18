import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import signaling from './services/signaling.service'

Vue.config.productionTip = false

Vue.use({
    install(Vue) {
        Vue.prototype.$signaling = signaling
        Vue.prototype.$axios = axios
    },
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
