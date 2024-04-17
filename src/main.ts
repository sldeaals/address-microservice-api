import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExceptionsFilter } from './utils/exception-filter.utils';
import { ApiResponseUtil } from './utils/api-response.utils';

function useSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Address Microservice API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useSwagger(app);
  app.useGlobalFilters(new ExceptionsFilter);
  app.useGlobalInterceptors(new ApiResponseUtil);

  await app.listen(process.env.PORT);
}
bootstrap();
