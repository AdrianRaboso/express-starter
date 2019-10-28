import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import UserService from '../../services/user';
const route = Router();

export default (app: Router) => {
  // Global route
  app.use('/users', route);
  // Services instances
  const userService = Container.get(UserService);

  route.get('/', async (req: Request, res: Response) => {
    const users = await userService.GetUsers();
    res.status(200).send({ users: users });
  });
};
