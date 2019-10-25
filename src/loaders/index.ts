import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';
import models from '../models';

export default async ({ expressApp }: any) => {
  const mongoConnection = await mongooseLoader();
  console.log('✔️  Database connection ready!');

  await dependencyInjectorLoader({ mongoConnection, models: models });
  console.log('✔️  Dependency injection ready!');

  await expressLoader({ app: expressApp });
  console.log('✔️  Express configuration ready!');
};
