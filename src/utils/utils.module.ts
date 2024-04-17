import { Module } from '@nestjs/common';
import { ApiResponseUtil } from './api-response.utils';
import { ExceptionsFilter } from './exception-filter.utils';

@Module({
  providers: [ApiResponseUtil, ExceptionsFilter],
  exports: [ApiResponseUtil, ExceptionsFilter],
})
export class UtilsModule {}
