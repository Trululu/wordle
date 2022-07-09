import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public async get(key: string) {
    return await this.cache.get(key);
  }

  public async set(key: string, value: any) {
    await this.cache.set(key, value);
  }
  public async del(key: string) {
    await this.cache.del(key);
  }
}
