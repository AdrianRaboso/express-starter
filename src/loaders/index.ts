import expressLoader from './express';

export default async ({ expressApp }: any) => {
  // List of loaders
  await expressLoader({ app: expressApp });
  console.log('✔️  Express loaded!');
};
