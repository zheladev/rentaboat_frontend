import publicRoutes from './public';
import authRoutes from './authenticated';
import adminRoutes from './admin';

const routes = [
    publicRoutes,
    authRoutes,
    adminRoutes,
]

export default Array.prototype.concat.apply([], routes);