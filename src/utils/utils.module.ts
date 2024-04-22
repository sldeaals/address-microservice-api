import { Module } from '@nestjs/common';
import { ApiResponseUtil } from './api-response.util';
import { ExceptionsFilter } from './exception-filter.util';

@Module({
  providers: [ApiResponseUtil, ExceptionsFilter],
  exports: [ApiResponseUtil, ExceptionsFilter],
})
export class UtilsModule {}
