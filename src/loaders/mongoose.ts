import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from 'config';

export default async (): Promise<Db> => {
  const mongoURI = `${config.get("dbConfig.mongoURI")}/${config.get("dbConfig.dbName")}`;
  const db = await mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  return db.connection.db;
};