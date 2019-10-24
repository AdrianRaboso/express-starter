import { Router } from 'express';
import user from './routes/user';

export default () => {
  const app = Router();

  // List of routes
  user(app);

  return app;
};
