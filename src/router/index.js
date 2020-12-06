import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import LoginPage from '../views/LoginPage.vue';
import NotFound from '../views/NotFound.vue';
import Logout from '../views/Logout.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'landing',
        component: Landing,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/login',
        name: 'loginPage',
        component: LoginPage,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: NotFound, //change
    },
    {
        path: '/settings',
        name: 'settings',
        component: NotFound, //change
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout, //change
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
