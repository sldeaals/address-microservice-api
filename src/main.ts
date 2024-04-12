import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(process.env.PORT);
}
bootstrap();
