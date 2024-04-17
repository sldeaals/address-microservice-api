import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export interface ApiResponse {
  success?: boolean;
  message?: string | null;
  error?: HttpException;
  status?: number;
}

@Injectable()
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;

    const status:number = isHttpException
      ? HttpStatus.BAD_REQUEST
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message:string = isHttpException
      ? exception.message
      : 'Internal Server Error';
    const error:string = isHttpException ? exception.name : 'error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception.message, exception.stack, this.constructor.name);
    }

    response.status(status).json({ success: false, message, error, status });
  }
}
