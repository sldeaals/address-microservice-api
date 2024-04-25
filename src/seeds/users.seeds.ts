import { UserRole } from '../auth/auth.types';

export const users = [
  {
    id: '6616e6c433860fb08e7ae54c',
    email: 'super_admin@example.com',
    role: UserRole.SUPER_ADMIN,
  },
  {
    id: '6616e76333860fb08e7ae60f',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
  },
  {
    id: '6616e76333860fb08e7ae610',
    email: 'tech_support@example.com',
    role: UserRole.TECH_SUPPORT,
  },
  {
    id: '6616e76333860fb08e7ae611',
    email: 'customer@example.com',
    role: UserRole.CUSTOMER,
  },
];
