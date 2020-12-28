import ClientDashboard from '@/views/ClientDashboardPage.vue';
import Settings from '@/views/SettingsPage.vue';
import PastRentals from '@/components/dashboard/client/PastRentals.vue';
import UpcomingRentals from '@/components/dashboard/client/UpcomingRentals.vue';
import Support from '@/components/dashboard/client/Support.vue';
import Messages from '@/components/dashboard/Messages.vue';
import RentalPayment from '@/views/RentalPaymentPage.vue';
import Overview from '@/components/dashboard/client/Overview.vue';
import AUTH_LEVELS from '../consts';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: ClientDashboard,
        redirect: {
            name: 'overview'
        },
        meta: {
            authLevel: AUTH_LEVELS.USER
        },
        children: [
            {
                path: '',
                name: 'overview',
                component: Overview
            },
            {
                path: 'upcomingRentals',
                name: 'upcomingRentals',
                component: UpcomingRentals,
            },
            {
                path: 'rentalHistory',
                name: 'rentalHistory',
                component: PastRentals,
            },
            {
                path: 'messages',
                name: 'messages',
                component: Messages,
            },
            {
                path: 'support',
                name: 'support',
                component: Support,
            },

        ]
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