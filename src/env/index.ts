import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

const {
  PORT,
  JWT_SECRET_KEY,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export const MAIN_ENV = {
  APP: {
    PORT: Number.parseInt(PORT, 10) || 5000,
    JWT_SECRET_KEY: JWT_SECRET_KEY,
  },
  DATABASE: {
    HOST: DB_HOST,
    PORT: Number.parseInt(DB_PORT, 10) || 5432,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    DATABASE: DB_NAME,
  },
};
