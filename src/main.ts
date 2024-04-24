import fs from 'fs';
import https from 'https';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter } from './utils/exception.filter.util';
import { ApiResponseUtil } from './utils/api.response.util';
import { Environment } from './utils/types.util';
import { rateLimitMiddleware } from './utils/middlewares/rate-limit.middleware';
import { RedisService } from './redis/redis.service';
import { RedisCacheInterceptor } from './redis/redis.interceptor';
import { ClusterService } from './cluster/cluster.service';
import { IpWhitelistService } from './utils/services/ip.whitelist.service.util';

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
  const env = process.env.ENVIRONMENT;
  const ipWhitelistService = new IpWhitelistService;

  useSwagger(app);
  
  app.use(rateLimitMiddleware);
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(
    new RedisCacheInterceptor(new RedisService),
    new ApiResponseUtil()
  );
  app.enableCors({
    origin: ipWhitelistService.getAllowedIps(),
    credentials: true
  });

  if (env === Environment.PRODUCTION) {
    const httpsOptions = {
      key: fs.readFileSync('path/to/private-key.pem'),
      cert: fs.readFileSync('path/to/certificate.pem'),
    };
    const httpsServer = https.createServer(httpsOptions, app.getHttpAdapter().getInstance());
    httpsServer.listen(process.env.PORT, () => {
      Logger.log(`Application is running on: ${process.env.PORT}`);
    });
    httpsServer.on('error', (error) => {
      Logger.error(`HTTPS server error: ${error}`);
    });
  } else {
    await app.listen(process.env.PORT);
  }
}
ClusterService.clusterize(bootstrap);
