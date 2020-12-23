import Dashboard from '@/views/Dashboard.vue';
import Settings from '@/views/Settings.vue';
import RentalPayment from '@/views/RentalPayment.vue';
import AUTH_LEVELS from '../consts';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            authLevel: AUTH_LEVELS.USER
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            authLevel: AUTH_LEVELS.USER,
        }
    },
    {
        path: '/rentalPayment/:boatId/',
        name: 'rentalPayment',
        component: RentalPayment,
        props: true,
        meta: {
            authLevel: AUTH_LEVELS.USER,
        }
    }
]

export default routes;