import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
dotenv();

const {
  WORDLE_DB_HOST,
  WORDLE_DB_PORT,
  WORDLE_DB_USER,
  WORDLE_DB_PASSWORD,
  NODE_ENV,
  WORDLE_DB_NAME,
} = process.env;

export default registerAs('database.main', () => ({
  type: 'postgres',
  host: WORDLE_DB_HOST,
  port: parseInt(WORDLE_DB_PORT),
  username: WORDLE_DB_USER,
  password: WORDLE_DB_PASSWORD,
  name: WORDLE_DB_NAME,
  autoLoadEntities: true,
  synchronize: NODE_ENV == 'develop',
}));
