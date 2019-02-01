const express = require('express');
const next = require('next');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const expressValidator = require('express-validator');

// Configuration
const config = require('./lib/config');

const dev = process.env.NODE_ENV !== 'production';
const { port, url } = config;
const ROOT_URL = url;

// Models
require('./models/user');
require('./models/post');

// Routes
const routes = require('./routes');

// Load passport strategy
require('./handlers/passport');

const app = next({ dev });
const handle = app.getRequestHandler();

module.exports = app.prepare().then(() => {
  const server = express();

  // ** only for production **
  // helmet: helps secure our app by setting various HTTP headers
  // compression: gives us gzip compression
  if (!dev) {
    server.use(helmet());
    server.use(compression());
  }

  // add passport middleware to set passport up
  server.use(passport.initialize());

  // morgan for request loggin from client
  server.use(
    morgan('dev', {
      skip: req => req.url.includes('_next')
    })
  );

  // Body parser built-in to Express
  server.use(express.json());

  // This will validate form data sent to the backend
  server.use(expressValidator());

  // Error handling from async / await functions
  server.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json(message);
  });

  // Apply routes from the 'routes' folder
  server.use('/', routes);

  // Give all Next.js requests to Next.js server
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
