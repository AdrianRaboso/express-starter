import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import UserService from '../../services/user';
import middlewares from '../../middlewares';
const route = Router();

export default (app: Router) => {
  // Global route
  app.use('/users', middlewares.isAuth, route);
  // Services instances
  const userService = Container.get(UserService);

  route.get('/', async (req: Request | any, res: Response) => {
    const users = await userService.GetUsers();
    res.status(200).send(users);
  });
};
