import app from './app';
import databaseMain from './database-main';
import redis from './redis';
import auth from './auth';

const config = [databaseMain, app, redis, auth];

export default config;
