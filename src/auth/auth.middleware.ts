import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ApiKeyService } from '../utils/services/api.key.service.util';
import { IpWhitelistService } from '../utils/services/ip.whitelist.service.util';
import { User } from './auth.types';
import { parseIp } from '../utils/common/common.util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly apiKeyService: ApiKeyService,
    private readonly ipWhitelistService: IpWhitelistService,
  ) {}

  async use(req: Request & { user: User } & { ip: string }, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'] as string;
    const apiKeySecret = req.headers['api-key-secret'] as string;
    const clientIp = parseIp(req) || req.ip;

    if (!this.apiKeyService.isValidApiKey(apiKey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    if (!this.ipWhitelistService.isIpAllowed(clientIp)) {
      throw new UnauthorizedException('IP address not allowed');
    }

    const user = await this.authService.authenticate(apiKey, apiKeySecret);
    if (!user) {
      throw new UnauthorizedException('Invalid API Key or API Key Secret.');
    }

    req.user = user;
    next();
  }
}
