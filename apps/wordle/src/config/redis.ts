import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
dotenv();

const { APP_REDIS } = process.env;

export default registerAs('redis', () => ({
  url: APP_REDIS,
}));
