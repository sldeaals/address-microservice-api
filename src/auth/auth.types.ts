export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  TECH_SUPPORT = 'TECH_SUPPORT',
  CUSTOMER = 'CUSTOMER',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}
