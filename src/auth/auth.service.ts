import { Injectable } from '@nestjs/common';
import { User, UserRole } from './auth.types';

@Injectable()
export class AuthService {
  constructor() {}
  
  async authenticate(apiKey: string, apiKeySecret: string): Promise<User> {
    let user: User;
    
    if (apiKey === process.env.API_KEY && apiKeySecret === process.env.API_KEY_SECRET){
       user = { id: '6616e6c433860fb08e7ae54c', email: 'super_admin@example.com', roles: [UserRole.SUPER_ADMIN]}
    }console.log("user", user);
    return user;
  }
}
