import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Environment } from '../utils.types';

@Injectable()
export class EncodingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<string | object> {
    if (process.env.ENVIRONMENT !== Environment.PRODUCTION) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return encodeURIComponent(data);
        } else if (typeof data === 'object') {
          const encodedData = {};
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              encodedData[key] = encodeURIComponent(data[key]);
            }
          }
          return encodedData;
        } else {
          return data;
        }
      }),
    );
  }
}
