import Vue from 'vue'
import VueRouter from 'vue-router'
import Entry from '../views/Entry.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Entry',
        component: Entry,
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import(/* webpackChunkName: "home" */ '../views/Home.vue'),
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
    {
        path: '/auth/register',
        name: 'Authentication | Register',
        component: () =>
            import(
                /* webpackChunkName: "auth-register" */ '../views/auth/Register.vue'
            ),
    },
    {
        path: '/auth/code',
        name: 'Authentication | Two-factor Authentication',
        component: () =>
            import(
                /* webpackChunkName: "auth-code" */ '../views/auth/Code.vue'
            ),
    },
]

const router = new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    console.log(to, from)
    next()
})

export default router
