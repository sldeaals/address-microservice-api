import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisCacheInterceptor } from './redis.interceptor';

@Module({
  providers: [RedisService, RedisCacheInterceptor],
  exports: [RedisCacheInterceptor],
})
export class RedisModule {}
