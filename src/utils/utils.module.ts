import { Module } from '@nestjs/common';
import { ApiResponseUtil } from './api.response.util';
import { ExceptionsFilter } from './exception.filter.util';
import { ApiKeyService } from './api.key.service.util';
import { IpWhitelistService } from './ip.whitelist.service.util';

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
