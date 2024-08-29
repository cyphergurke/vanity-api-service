import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_ROUTE_KEY = 'apikeys';
export const AdminRoute = () => SetMetadata(IS_ADMIN_ROUTE_KEY, true);
