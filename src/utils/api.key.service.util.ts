import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { UserRole } from '../auth/auth.types';

@Injectable()
export class ApiKeyService {
  private readonly keyLength = 32;
  //private readonly validKeys: Set<string> = new Set();
  private readonly validKeys: Map<string, UserRole[]> = new Map();

  constructor() {
    // TODO - Load valid API keys from a secure source
    this.validKeys.set(process.env.API_KEY_ADMIN, [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TECH_SUPPORT]);
    this.validKeys.set(process.env.API_KEY_CUSTOMER, [UserRole.CUSTOMER]);
  }

  generateApiKey(): string {
    const apiKey = crypto.randomBytes(this.keyLength).toString('hex');
    
    return apiKey;
  }

  isValidApiKey(apiKey: string): boolean {
    return this.validKeys.has(apiKey);
  }

  async getValidKeys(): Promise<Set<string>> {
    // TODO - Get valid API keys from a secure secret manager
    const validKeysMap = new Set([...this.validKeys.keys()]);

    return validKeysMap;
  }

  getKeyPermissions(apiKey: string): UserRole[] | undefined {
    return this.validKeys.get(apiKey);
  }
}
