const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const isPostgres = process.env.DB_DIALECT === 'postgres' || process.env.DATABASE_URL;
const dbHost = process.env.DB_HOST === 'localhost' ? '127.0.0.1' : (process.env.DB_HOST || '127.0.0.1');

const sequelize = isPostgres
  ? new Sequelize(process.env.DATABASE_URL || {
      dialect: 'postgres',
      host: dbHost,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'kidemora',
      logging: false,
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: 'src/database.sqlite',
      logging: false,
    });

module.exports = sequelize;