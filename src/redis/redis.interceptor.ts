import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { RedisService } from './redis.service';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../utils/interfaces/api.response.interface.util';

@Injectable()
export class RedisCacheInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private readonly redisService: RedisService){}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<ApiResponse<T>>> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl } = request;

    if (method === 'GET') {
      const cachedData = await this.redisService.get(originalUrl);

      if (cachedData) {
        const parsedData: ApiResponse<T> = JSON.parse(cachedData);

        return of(parsedData);
      } else {
        return next.handle().pipe(
          tap((data) => {
            this.redisService.set(originalUrl, JSON.stringify(data));
          }),
        );
      }
    } else {
      return next.handle();
    }
  }
}
