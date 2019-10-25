import { Container } from 'typedi';
import { Db } from 'mongodb';
import userInstance from '../services/user';

export default ({ mongoConnection, models }: { mongoConnection: Db; models: { name: string; model: any }[] }) => {
  try {
    // Model injection
    models.forEach(m => Container.set(m.name, m.model));
    // Service injection
    Container.set('userInstance', userInstance);
  } catch (e) {
    console.log('🔥  Dependency injection error: ' + e);
    throw e;
  }
};
