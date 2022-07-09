import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
dotenv();

const { AUTH_PORT, NODE_ENV } = process.env;

export default registerAs('app', () => ({
  port: parseInt(AUTH_PORT),
  env: NODE_ENV,
}));
