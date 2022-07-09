import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('MAIN APP TS', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();

  await app.listen(config.getOrThrow('app.port'), () => {
    logger.log(`app running on port ${config.getOrThrow('app.port')}`);
  });
}
bootstrap();
