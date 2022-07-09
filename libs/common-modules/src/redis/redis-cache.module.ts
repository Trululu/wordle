import {
  Module,
  CacheModule,
  DynamicModule,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';
import { RedisCacheService } from './redis-cache.service';

@Module({})
export class RedisCacheModule {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
  static create(param: string): DynamicModule {
    return {
      module: RedisCacheModule,
      imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            store: redisStore,
            ...configService.get(param),
          }),
        }),
      ],
      providers: [RedisCacheService],
      exports: [RedisCacheService, CacheModule, RedisCacheModule],
    };
  }
}
