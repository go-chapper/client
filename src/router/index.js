import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/setup/welcome',
        name: 'Setup | Welcome',
        component: () =>
            import(
                /* webpackChunkName: "setup-welcome" */ '../views/setup/Welcome.vue'
            ),
    },
    {
        path: '/setup/server',
        name: 'Setup | Home Server',
        component: () =>
            import(
                /* webpackChunkName: "setup-server" */ '../views/setup/Server.vue'
            ),
    },
    {
        path: '/setup/auth',
        name: 'Setup | Authentication',
        component: () =>
            import(
                /* webpackChunkName: "setup-auth" */ '../views/setup/Auth.vue'
            ),
    },
    {
        path: '/auth/login',
        name: 'Authentication | Login',
        component: () =>
            import(
                /* webpackChunkName: "auth-login" */ '../views/auth/Login.vue'
            ),
    },
]

const router = new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
