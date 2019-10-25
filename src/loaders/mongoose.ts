import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from 'config';

export default async (): Promise<Db> => {
  const db = await mongoose.connect(config.get("dbConfig.mongoURI"), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  return db.connection.useDb(config.get("dbConfig.dbName")).db;
};