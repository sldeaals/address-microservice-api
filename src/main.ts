import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter } from './utils/filters/exception.filter.util';
import { ApiResponseUtil } from './utils/common/api.response.util';
import { createHttpServer } from './utils/common/common.util';
import { Environment } from './utils/utils.types';
import { rateLimitMiddleware } from './utils/middlewares/rate-limit.middleware';
import { RedisService } from './redis/redis.service';
import { RedisCacheInterceptor } from './redis/redis.interceptor';
import { ClusterService } from './cluster/cluster.service';
import { IpWhitelistService } from './utils/services/ip.whitelist.service.util';
import { SanitizationPipe } from './utils/pipes/sanitization.pipe.util';
import { EncodingInterceptor } from './utils/interceptors/encode.interceptor.util';

function useSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Address Microservice API')
    .setVersion('0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const env = process.env.ENVIRONMENT;
  const ipWhitelistService = new IpWhitelistService();

  app.use(rateLimitMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new SanitizationPipe(),
  );
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(
    new RedisCacheInterceptor(new RedisService()),
    new EncodingInterceptor(),
    new ApiResponseUtil(),
  );
  app.enableCors({
    origin: ipWhitelistService.getAllowedIps(),
    credentials: true,
  });

  if (env === Environment.PRODUCTION) {
    const httpsServer = createHttpServer(app);

    httpsServer.listen(process.env.PORT, () => {
      Logger.log(`Application is running on: ${process.env.PORT}`);
    });
    httpsServer.on('error', (error) => {
      Logger.error(`HTTPS server error: ${error}`);
    });
  } else if (env === Environment.DEVELOPMENT || env === Environment.TESTING) {
    useSwagger(app);
    await app.listen(process.env.PORT);
  }
}
ClusterService.clusterize(bootstrap);
