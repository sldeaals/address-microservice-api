import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './auth.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request & { user: User }, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'] as string;
    const apiKeySecret = req.headers['api-key-secret'] as string;

    if (!apiKey || !apiKeySecret) {
      throw new UnauthorizedException('API Key and API Key Secret are required.');
    }

    const user = await this.authService.authenticate(apiKey, apiKeySecret);
    if (!user) {
      throw new UnauthorizedException('Invalid API Key or API Key Secret.');
    }

    req.user = user;
    next();
  }
}
