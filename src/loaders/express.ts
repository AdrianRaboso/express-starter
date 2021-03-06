import { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import methodOverride from 'method-override';
import config from 'config';

export default ({ app }: { app: Application }) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
  app.use(methodOverride());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.get('api.prefix'), routes());

  // Error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      return res
        .status(err.status || 500)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
};
