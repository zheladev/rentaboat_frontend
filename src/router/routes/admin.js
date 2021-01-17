import AUTH_LEVELS from '../consts';
import AdminDashboard from '@/views/AdminDashboardPage.vue';
import BoatCRUD from '@/components/dashboard/admin/BoatCRUD.vue';
import BoatTypeCRUD from '@/components/dashboard/admin/BoatTypeCRUD.vue';
import PortCRUD from '@/components/dashboard/admin/PortCRUD.vue';
import RentalCRUD from '@/components/dashboard/admin/RentalCRUD.vue';
import ShipyardCRUD from '@/components/dashboard/admin/ShipyardCRUD.vue';
import UserCRUD from '@/components/dashboard/admin/UserCRUD.vue';

 
const routes = [
    {
        path: '/adminDashboard',
        name: 'adminDashboard',
        component: AdminDashboard,
        meta: {
            authLevel: AUTH_LEVELS.ADMIN
        },
        children: [
            {
                path: 'boats',
                name: 'boatCRUD',
                component: BoatCRUD
            },
            {
                path: 'ports',
                name: 'portCRUD',
                component: PortCRUD
            },
            {
                path: 'boatTypes',
                name: 'boatTypeCRUD',
                component: BoatTypeCRUD
            },
            {
                path: 'rentals',
                name: 'rentalCRUD',
                component: RentalCRUD
            },
            {
                path: 'shipyards',
                name: 'shipyardCRUD',
                component: ShipyardCRUD
            },
            {
                path: 'users',
                name: 'userCRUD',
                component: UserCRUD
            },
        ]
    },
]

export default routes;