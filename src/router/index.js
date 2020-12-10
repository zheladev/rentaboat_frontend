import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import LoginPage from '../views/LoginPage.vue';
import Logout from '../views/Logout.vue';
import Dashboard from '../views/Dashboard.vue';
import Settings from '../views/Settings.vue';
import NotFound from '../views/NotFound.vue';
import BoatPage from '../views/BoatPage.vue';


Vue.use(VueRouter);

const routes = [
    //common
    {
        path: '/',
        name: 'landing',
        component: Landing,
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/login',
        name: 'loginPage',
        component: LoginPage,
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
    },
    {
        path: '/boat/:id',
        name: 'boat',
        component: BoatPage,
    },
    //user
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
    },
    {
        path: '*',
        component: NotFound,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
