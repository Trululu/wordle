import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.string()
    .regex(/^[0-9]+$/)
    .default(5000),
  NODE_ENV: Joi.string()
    .valid('develop', 'production', 'test')
    .default('develop'),
});
