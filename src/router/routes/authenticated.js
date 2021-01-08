import ClientDashboard from '@/views/ClientDashboardPage.vue';
import Settings from '@/views/SettingsPage.vue';
import RentalPayment from '@/views/RentalPaymentPage.vue';
import OwnerDashboard from '@/views/OwnerDashboardPage.vue';
import Overview from '@/components/dashboard/client/Overview.vue';
import General from '@/components/settings/General.vue';
import Account from '@/components/settings/Account.vue';
import PastRentals from '@/components/dashboard/client/PastRentals.vue';
import UpcomingRentals from '@/components/dashboard/client/UpcomingRentals.vue';
import Support from '@/components/dashboard/Support.vue';
import Messages from '@/components/dashboard/Messages.vue';
import OwnerBoats from '@/components/dashboard/owner/OwnerBoats.vue';
import OwnerBoat from '@/components/dashboard/owner/OwnerBoat.vue';
import AUTH_LEVELS from '../consts';

const routes = [
    {
        path: '/ownerDashboard',
        name: 'ownerDashboard',
        component: OwnerDashboard,
        redirect: {
            name: 'ownerBoats'
        },
        meta: {
            authLevel: AUTH_LEVELS.OWNER
        },
        children: [
            {
                path: 'boats',
                name: 'ownerBoats',
                component: OwnerBoats,
            },
            {
                path: 'messages',
                name: 'ownerMessages',
                component: Messages,
            },
            {
                path: 'support',
                name: 'ownerSupport',
                component: Support,
            },
            {
                path: 'boat/:id',
                name: 'ownerBoatDetails',
                component: OwnerBoat,
            },
        ]
    },
    {
        path: '/clientDashboard',
        name: 'clientDashboard',
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
                name: 'clientMessages',
                component: Messages,
            },
            {
                path: 'support',
                name: 'clientSupport',
                component: Support,
            },

        ]
    },
    {
        path: '/settings',
        name: '',
        component: Settings,
        meta: {
            authLevel: AUTH_LEVELS.USER,
        },
        children: [
            {
                path: '',
                name: 'settings',
                component: General,
            },
            {
                path: 'account',
                name: 'accountSettings',
                component: Account,
            }
        ]
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