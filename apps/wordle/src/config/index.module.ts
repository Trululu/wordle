import { Module } from '@nestjs/common';
import configuration from '.';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configuration,
      isGlobal: true,
      validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
