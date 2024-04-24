import { Module } from '@nestjs/common';
import { ApiResponseUtil } from './api.response.util';
import { ExceptionsFilter } from './filters/exception.filter.util';
import { ApiKeyService } from './services/api.key.service.util';
import { IpWhitelistService } from './services/ip.whitelist.service.util';

@Module({
  providers: [
    ApiResponseUtil,
    ExceptionsFilter,
    ApiKeyService,
    IpWhitelistService,
  ],
  exports: [
    ApiResponseUtil,
    ExceptionsFilter,
    ApiKeyService,
    IpWhitelistService,
  ],
})
export class UtilsModule {}
