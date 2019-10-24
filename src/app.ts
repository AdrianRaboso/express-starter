import express from 'express';
import config from 'config';

(async function startServer() {
  // Create a new express application instance
  const app: express.Application = express();
  const port: number = config.get('port');

  // Load all app modules
  await require('./loaders').default({ expressApp: app });

  // Run server
  app.listen(port, function() {
    console.log(`
      ##################################
      Node server listening on port ${port}
      ##################################
    `);
  });
})();
