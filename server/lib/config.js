require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const config = {
  port: process.env.PORT || 3000,
  db: dev ? process.env.DEV_DB : process.env.MONGO_URI,
  url: dev ? `http://localhost:${port}` : process.env.PROD_URL,
  secret: process.env.SESSION_SECRET || 'jwtSecret'
};

module.exports = config;
