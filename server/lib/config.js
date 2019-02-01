require('dotenv').config();

const dev = process.env.NODE_EN !== 'production';
const port = process.env.PORT || 3000;

const config = {
  port: process.env.PORT || 3000,
  db: dev ? 'mongodb://localhost/barbelith-db' : process.env.MONGO_URI,
  url: dev ? `http://localhost:${port}` : process.env.PROD_URL,
  secret: process.env.SESSION_SECRET || 'jwtSecret'
};

module.exports = config;
