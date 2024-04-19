import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../common/api-response.interface';

@Injectable()
export class ApiResponseUtil<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const { method } = request;
    const controller = context.getClass().name;

    return next.handle().pipe(
      map(data => {
        const message = this.constructMessage(controller, method);
        return {
          success: true,
          data,
          status: HttpStatus.OK,
          message,
        };
      }),
    );
  }

  private constructMessage(controller: string, method: string): string {
    const action = this.getActionName(method);
    const resource = this.getResourceName(controller);
    return `Success ${action} ${resource}`;
  }

  private getActionName(method: string): string {
    switch (method) {
      case 'POST':
        return 'creating';
      case 'PUT':
        return 'updating';
      case 'DELETE':
        return 'deleting';
      default:
        return 'fetching';
    }
  }

  private getResourceName(controller: string): string {
    const parts = controller.split('Controller');
    return parts[0];
  }
}
