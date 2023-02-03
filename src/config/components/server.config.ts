'use strict';

import Joi from 'joi';

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().allow('').required(),
  API_VERSION: Joi.string().allow('').required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP_DAY: Joi.number().optional(),
});

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env, {
  stripUnknown: true,
});

export default {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  detail: {
    port: envVars.PORT || 3000,
    apiVersion: envVars.API_VERSION || 'v1',
  },
  jwtSecret: envVars.JWT_SECRET,
  jwtExpDay: envVars.JWT_EXP_DAY,
};

// if (error && config.isTest) {
//   throw new Error(`Config validation error: ${error.message}`);
// }
