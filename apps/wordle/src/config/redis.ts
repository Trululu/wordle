import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
dotenv();

const { APP_REDIS, APP_REDIS_HOST, APP_REDIS_PORT, APP_REDIS_CACHE_TTL } =
  process.env;

export default registerAs('redis', () => ({
  url: APP_REDIS,
  cache: {
    ttl: 60 * parseInt(APP_REDIS_CACHE_TTL),
    host: APP_REDIS_HOST,
    port: parseInt(APP_REDIS_PORT),
  },
}));
