import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.setHeader('X-Frame-Options', 'SAMEORIGIN');

    res.setHeader('X-XSS-Protection', '1; mode=block');

    next();
  }
}
