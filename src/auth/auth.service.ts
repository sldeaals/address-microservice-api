import { Injectable } from '@nestjs/common';
import { User, UserRole } from './auth.types';
import { users } from '../seeds/users.seeds';

@Injectable()
export class AuthService {
  constructor() {}

  async authenticate(apiKey: string, apiKeySecret: string): Promise<User> {
    let user: User;

    if (apiKey && apiKeySecret) {
      // TODO - Fetch the user information from User Auth Microservice API
      user = users.find((_user) => _user.role === UserRole.SUPER_ADMIN);
    }

    return user;
  }
}
