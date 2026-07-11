import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // create nest application instance
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors(); // enable cors

  app.setGlobalPrefix('api'); // global apiprefix

  // enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Booking Management API')
    .setDescription('NestJS Booking Management System API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT', 3000); // get port from env
  await app.listen(port);

  console.log(`application is running on: http://localhost:${port}`);
}

bootstrap();
