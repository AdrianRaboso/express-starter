import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInputDTO } from '../../interfaces/IUser';
const route = Router();

export default (app: Router) => {
  // Global route
  app.use('/auth', route);
  // Services instances
  const authService = Container.get(AuthService);

  route.post(
    '/signup',
    // celebrate({
    //   body: Joi.object({
    //     name: Joi.string().required(),
    //     email: Joi.string().required(),
    //     password: Joi.string().required(),
    //   }),
    // }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { user, token } = await authService.SignUp(req.body as IUserInputDTO);
        return res.status(201).json({ user, token });
      } catch (e) {
        return next(e);
      }
    },
  );
};
