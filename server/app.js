const express = require('express');
const next = require('next');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PROD_URL;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // Give all Next.js requests to Next.js server
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on ${ROOT_URL}`);
  });
});
