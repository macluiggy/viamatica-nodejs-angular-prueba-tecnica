import * as dotenv from 'dotenv';
dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USERNAME = process.env.DB_USERNAME || 'viamatica';
const DB_PASSWORD = process.env.DB_PASSWORD || 'viamatica';
const DB_DATABASE = process.env.DB_DATABASE || 'viamatica';

const databaseUrl = process.env.DATABASE_URL || `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const envVariables = {
  db: {
    databaseUrl,
  },
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'yourjwtsupersecret',
};

export default envVariables;