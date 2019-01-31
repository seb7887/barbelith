const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// Loads all env variables
require('dotenv').config();

// Models
require('./models/user');
require('./models/post');

// Routes
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PROD_URL;

const app = next({ dev });
const handle = app.getRequestHandler();

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log('-> DB connected'));

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
});

app.prepare().then(() => {
  const server = express();

  // ** only for production **
  // helmet: helps secure our app by setting various HTTP headers
  // compression: gives us gzip compression
  if (!dev) {
    server.use(helmet());
    server.use(compression());
  }

  // morgan for request loggin from client
  server.use(
    morgan('dev', {
      skip: req => req.url.includes('_next')
    })
  );

  server.use(express.json());

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
