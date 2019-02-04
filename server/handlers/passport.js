const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * First, we create a authentication strategy.
 * serializeUser determines which data of the user object should be store in the session
 * deserializeUser gets the object with the help of the key given with serializeUser. That key is matched with the in memory array / db or any data resource
 */
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
