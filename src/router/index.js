import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
import AUTH_LEVELS from './consts';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
      },
});

router.beforeEach(async (to, from, next) => {
    const user = store.state.auth.user;
    const isLoggedIn = store.state.auth.isLoggedIn;

    if(to.meta.authLevel >= AUTH_LEVELS.PUBLIC) {
        next();
    } else {
        if (!isLoggedIn) {
            next({ path: '/login' });
        } else {
            if (user.userType.intValue > to.meta.authLevel) {
                next({ path: '/forbidden' });
            } else {
                next();
            }
        }
    }
});

export default router;
