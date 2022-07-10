import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
dotenv();

const { AUTH_DB_HOST, AUTH_DB_PORT, AUTH_DB_USER, AUTH_DB_PASSWORD, NODE_ENV } =
  process.env;

export default registerAs('database.main', () => ({
  type: 'postgres',
  host: AUTH_DB_HOST,
  port: parseInt(AUTH_DB_PORT),
  username: AUTH_DB_USER,
  password: AUTH_DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: NODE_ENV == 'develop',
}));
