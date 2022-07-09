import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
dotenv();

const { APP_PORT, NODE_ENV } = process.env;

export default registerAs('app', () => ({
  port: parseInt(APP_PORT),
  env: NODE_ENV,
}));
