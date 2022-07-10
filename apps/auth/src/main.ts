import { AllExceptionsFilter } from '@app/common-modules';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

const logger = new Logger('AUTH APP TS', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const config = app.get(ConfigService);
  app.enableCors();

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(config.getOrThrow('app.port'), () => {
    logger.log(`app running on port ${config.getOrThrow('app.port')}`);
  });
}
bootstrap();
