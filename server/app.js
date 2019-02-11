const express = require('express');
const next = require('next');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoSessionStore = require('connect-mongo');
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

  // Body parser built-in to Express
  server.use(express.json());

  // This will validate form data sent to the backend
  server.use(expressValidator());

  // // Give all Next.js requests to Next.js server
  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    handle(req, res);
  });

  // stores sessions in a mongodb collection
  const MongoStore = mongoSessionStore(session);
  // session configuration
  const sessionConfig = {
    name: 'barbelith.sid',
    // secret used for using signed cookies with the session
    secret: config.secret,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60 // save session for 14 days
    }),
    // forces the session to be saved back to the store
    resave: false,
    // don't save unmodified sessions
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
    }
  };

  if (!dev) {
    sessionConfig.cookie.secure = true; // serve secure cookies in the production env
    server.set('trusty proxy', 1); // trust first proxy
  }

  // sessions allow us to store data on visitors from request to request
  // this keeps user logged in and allows us to send flash messages
  server.use(session(sessionConfig));

  // add passport middleware to set passport up
  server.use(passport.initialize());
  server.use(passport.session());

  // custom middleware to put out user data (from passport) on the req.user, so we
  // can access it as such anywhere in out app
  server.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

  // morgan for request loggin from client
  server.use(
    morgan('dev', {
      skip: req => req.url.includes('_next')
    })
  );

  // Apply routes from the 'routes' folder
  server.use('/', routes);

  // Error handling from async / await functions
  server.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json(message);
  });

  // Custom routes with route params
  server.get('/profile/:userId', (req, res) => {
    const routeParams = Object.assign({}, req.params, req.query);
    return app.render(req, res, '/profile', routeParams);
  });

  /* default route
  - allows Next to handle all other routes
  - includes the numerous `/_next/...` routes which must    be exposedfor the next app to work correctly
  - includes 404'ing on unknown routes */
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
