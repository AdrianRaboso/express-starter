import { Container } from 'typedi';
import { Db } from 'mongodb';

export default ({ mongoConnection, models }: { mongoConnection: Db; models: { name: string; model: any }[] }) => {
  try {
    // Model injection
    models.forEach(m => Container.set(m.name, m.model));
  } catch (e) {
    console.log('🔥  Dependency injection error: ' + e);
    throw e;
  }
};
