import express from 'express';
import "reflect-metadata";
import mongoose from 'mongoose';

(async function startServer() {
  // Set config directory
  process.env['NODE_CONFIG_DIR'] = './src/config/';
  const config = require('config');

  // Create a new express application instance
  const app: express.Application = express();
  
  // Load all app modules
  await require('./loaders').default({ expressApp: app });
  
  // Run server
  const port: number = config.get('port');
  app.listen(port, function() {
    console.log(`
      ##################################
      Node server listening on port ${port}
      ##################################
    `);
  });
})();
