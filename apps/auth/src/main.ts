import { AllExceptionsFilter } from '@app/common-modules';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('AUTH APP TS', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const config = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wordle Auth API')
    .setDescription('Wordle auth APi')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors();
  app.use(cookieParser());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(config.getOrThrow('app.port'), () => {
    logger.log(`app running on port ${config.getOrThrow('app.port')}`);
  });
}
bootstrap();
