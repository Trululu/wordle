import app from './app';
import databaseMain from './database-main';
import redis from './redis';

const config = [databaseMain, app, redis];

export default config;
