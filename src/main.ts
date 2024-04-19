import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter } from './utils/exception-filter.utils';
import { ApiResponseUtil } from './utils/api-response.utils';
import { RedisService } from './redis/redis.service';
import { RedisCacheInterceptor } from './redis/redis.interceptor';
import { ClusterService } from './cluster/cluster.service';

function useSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Address Microservice API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  useSwagger(app);
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(
    new RedisCacheInterceptor(new RedisService),
    new ApiResponseUtil()
  );

  await app.listen(process.env.PORT);
}
ClusterService.clusterize(bootstrap);
