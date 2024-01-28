import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DocumentOptions } from './swagger/documentOptions';
import { CustomOptions } from './swagger/customOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TestMe')
    .setDescription('Api which loves to be tested.')
    .setVersion('1.0')
    .addTag('User Routes')
    .addTag('Authorization Routes')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const options: DocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const customOptions: CustomOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document, customOptions);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
