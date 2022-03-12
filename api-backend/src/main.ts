import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const bootstrapLogger = new Logger('Main');

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);

  const globalPrefix = configService.get('HTTP_API_PREFIX');

  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Hackathon API')
    .setDescription('Hackathon API documentation')
    .setVersion('0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  SwaggerModule.setup(configService.get('HTTP_SWAGGER_DOCS_PREFIX'), app, document);

  const port = configService.get('HTTP_PORT');

  await app.listen(port, '0.0.0.0').then(() => bootstrapLogger.log(`Nestway is listening on port ${port}`));
}
bootstrap();
