import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.string()
    .regex(/^[0-9]+$/)
    .default(5000),
  NODE_ENV: Joi.string()
    .valid('develop', 'production', 'test')
    .default('develop'),
  AUTH_DB_HOST: Joi.string().required(),
  AUTH_DB_PORT: Joi.string().required(),
  AUTH_DB_USER: Joi.string().required(),
  AUTH_DB_PASSWORD: Joi.string().required(),
  AUTH_DB_NAME: Joi.string().required(),
  APP_REDIS: Joi.string().required(),
});
