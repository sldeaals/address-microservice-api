import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  private readonly keyLength = 32;
  private readonly validKeys: Set<string> = new Set();

  constructor() {
    // TODO - Load valid API keys from a secure source
    this.validKeys.add(process.env.API_KEY_ADMIN);
    this.validKeys.add(process.env.API_KEY_CUSTOMER);
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
    return this.validKeys;
  }
}
