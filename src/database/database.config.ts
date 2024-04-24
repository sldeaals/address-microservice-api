import * as dotenv from 'dotenv';

dotenv.config();

export const mongoConfig = {
  uri:
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority` ||
    'default-mongodb-connection-string',
  dbName: process.env.MONGO_DBNAME,
  maxPoolSize: parseInt(process.env.MONGO_DB_MAX_POOL_SIZE || '10'),
};
