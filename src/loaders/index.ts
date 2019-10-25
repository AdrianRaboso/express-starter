import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }: any) => {
  // List of loaders
  await mongooseLoader();
  console.log('✔️  DB loaded and connected!');

  await expressLoader({ app: expressApp });
  console.log('✔️  Express loaded!');
};
