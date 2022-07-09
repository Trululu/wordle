import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule as Redis } from 'nestjs-redis';

@Module({})
export class RedisModule {
  static create(param: string): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        Redis.forRootAsync({
          useFactory: (configService: ConfigService) =>
            configService.get(param),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
