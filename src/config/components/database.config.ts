"use strict";

import Joi from "joi";
const { isTest } = require("./server.config");

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = Joi.object({
  DB_USER: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().optional(),
  DB_DATABASE: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_DIALECT: Joi.string().valid("mysql", "sqlite", "postgres").required(),
});

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = envSchema.validate(process.env, {
  stripUnknown: true,
});
if (error && !isTest) {
  throw new Error(`Config validation error: ${error.message}`);
}

const sequelizeConfig = {
  username: envVars.DB_USER,
  password: envVars.DB_PASSWORD,
  database: envVars.DB_DATABASE,
  host: envVars.DB_HOST,
  dialect: envVars.DB_DIALECT,
};

export const databaseConfig = {
  databaseConfig: {
    user: envVars.DB_USER,
    host: envVars.DB_HOST,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    port: envVars.DB_PORT,
  },
  development: sequelizeConfig,
  test: { ...sequelizeConfig, logging: false },
  production: sequelizeConfig,
};
