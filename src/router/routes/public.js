import Landing from '@/views/Landing.vue';
import LoginPage from '@/views/LoginPage.vue';
import Logout from '@/views/Logout.vue';
import NotFound from '@/views/NotFound.vue';
import BoatPage from '@/views/BoatPage.vue';
import About from '@/views/About.vue';
import AUTH_LEVELS from '../consts';

const routes = [
    {
        path: '/',
        name: 'landing',
        component: Landing,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
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
    {
        path: '*',
        component: NotFound,
    }
]

export default routes.map(route => {
    const meta = {
        authLevel: AUTH_LEVELS.PUBLIC,
    }
    return { ...route, meta }
})