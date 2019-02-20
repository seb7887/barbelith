const mongoose = require('mongoose');

// Load configuration
const config = require('../lib/config');

const { db } = config;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.Promise = Promise;
mongoose
  .connect(db, mongooseOptions)
  .then(() => console.log('-> DB connected'));

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
});

module.exports.User = require('./user');
module.exports.Post = require('./post');
